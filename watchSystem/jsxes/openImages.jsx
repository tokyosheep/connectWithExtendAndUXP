#target photoshop

(function(){
    var msg = [];
    var images = msg;
    for(var i=0;images.length>i;i++){
        try{
            var img = new File(images[i]);
            app.open(img);
        }catch(e){
            alert(e);
            break;
        }
    }
})();