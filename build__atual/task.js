self.addEventListener('message', function(e) {
    //self.postMessage(e.data);
    console.log("e",e);

    const canvas = document.createElement("canvas");
    /*
    let imageBlob = null;

    let width = img.width;
    let height = img.height;
    let ratio = null;

    if (width > height) {
        ratio = Math.min(resized_height / width, resized_width / height);
    } else {
        ratio = Math.min(resized_width / width, resized_height / height);
    }
    
    width = width * ratio;
    height = height * ratio;
    */

    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(e, 0, 0, 50, 50);
    const quality = 1;
    
    canvas.toBlob(blob => {

        //console.timeLog("resize","TO BLOB");
        self.postMessage(blob)
    }, e.type, 0.5);
    
}, false);

