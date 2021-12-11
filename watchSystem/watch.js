const { watch } = require("fs");
const fs = require("fs");
const jsxk = require("jsxk");
jsxk.options.targetProcess = "Adobe Photoshop 2022";

/*
function loads images from directory
*/
const getImages = async() =>{
    const files = await fs.promises.readdir(`${__dirname}/images`);
    return files.map(f=>`${__dirname}/images/${f}`);
}

/**
 * excuting ExtendScript
 * @param {filePath} fileName 
 */
const connectExtendScript = async(fileName)=>{
    try{
        const j = await fs.promises.readFile(`${__dirname}/${fileName}`);
        /**
        * json type
        * {
        * msg:any,
        * jsx:string
        * }
        * @type {Object}
        **/
        const jsonObj = JSON.parse(j);
        /**
         * in case of openimages, it gets images from images directory
         */
        if(jsonObj.jsx==="openImages.jsx")jsonObj.msg= await getImages();
        const r = await jsxk.exec(`${__dirname}/jsxes/${jsonObj.jsx}`,{msg:jsonObj.msg});
        console.log(r);
    }catch(e){
        console.log(e);
    }
}


let flag = false;

(()=>{
    watch(`${__dirname}/msg.json`,async(eventType,filename)=>{
        /**
        * preventing double click. just in case
        **/
        setTimeout(()=>{
            flag = false;
        },5000);
        flag = true;
        console.log(`event type is: ${eventType}`);
        if (filename) {
            console.log(`filename provided: ${filename}`);
            await connectExtendScript(filename);
        } else {
            console.log('filename not provided');
        }
    })
})();