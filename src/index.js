import uxp from "uxp";

const fs = uxp.storage.localFileSystem;

/** 
* getting saved entry file path and directory from localStorage.
* @type {entry}
**/
const getStoragePath = async() =>{
    const f = await fs.getEntryForPersistentToken(await localStorage.getItem("watchFolder"));
    const entries = await f.getEntries();
    const jsxFolder = entries.find(entry=>{
        return entry.name === "jsxes" && entry.isFolder;
    });
    return {entries,jsxFolder};
}

/** 
* choose watch folder through dialog
* any case you can't omit it due to the security reason
**/
document.getElementById("set").addEventListener("click",async()=>{
    const f = await fs.getFolder();
    console.log(f);
    if(f===null)return;
    document.getElementById("path_name").textContent = `directory :${f.name}`;
    await localStorage.setItem("watchFolder",await fs.createPersistentToken(f));
})

/**
* excute ExtendScript through node.js
* writing in jsonData and node.js detects while watching json.
**/
document.getElementById("excute_jsx").addEventListener("click",async function(e){
    if(this.disabled){
        return;
    }
    this.disabled = true;
    const msg = document.getElementById("arg").value;
    const jsxName = document.getElementById("jsxListmenu").value;
    try{
        const {entries,jsxFolder} = await getStoragePath();
        if(jsxFolder===undefined)return;
        const msgJson = entries.find(entry=> entry.isFile && entry.name==="msg.json");
        await msgJson.write(JSON.stringify({msg,jsx:jsxName}));
    }catch(e){
        console.log(e);
    }finally{
        this.disabled = false;
    }
});



/**
* listing jsx files on selector.
* and user can select jsx from list.
**/
document.getElementById("setJsx").addEventListener("click",async()=>{
    try{
        const {jsxFolder} = await getStoragePath();
        if(jsxFolder===undefined)return;
        const jsxEntries = await jsxFolder.getEntries();
        const jsxes = jsxEntries.filter(entry=>{
            const extPlace = entry.nativePath.lastIndexOf(".");
            const ext = entry.nativePath.substr(extPlace,entry.nativePath.length);
            console.log(ext);
            return entry.isFile && ext === ".jsx";
        });
        const element = jsxes.reduce((acc,current)=>{
            return acc + `
            <sp-menu-item>${current.name}</sp-menu-item>`;
        },"");
        document.getElementById("jsxListmenu").innerHTML = element;
    }catch(e){
        console.log(e);
    }
})

document.getElementById("test").addEventListener("click",async()=>{
    const f = await fs.getFileForSaving("save.json");
    console.log(f);
    await f.write(JSON.stringify({v:"hello"}));
})