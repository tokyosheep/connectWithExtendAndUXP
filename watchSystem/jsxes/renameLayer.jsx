#target photoshop

(function(){
    var msg = "lay";
    if(app.documents.length < 1){
        alert("nothing any document on Photoshop");
        return;
    }
    try{
        app.activeDocument.activeLayer.name = msg;
    }catch(e){
        alert(e);
    }
})();