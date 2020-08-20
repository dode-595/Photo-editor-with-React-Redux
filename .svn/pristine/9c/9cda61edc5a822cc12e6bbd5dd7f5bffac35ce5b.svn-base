import Compressor from 'compressorjs';
import exif from 'exif-js';
import {ProjectAPI} from "../services/db/models/projectAPI";
const projectAPI = new ProjectAPI(); 

let info_project = null;
projectAPI.getActive().then(project => {
    info_project = project;
}); 

export const resizeImage = (file, medium_width, medium_height, original_width, original_height) => {
    return new Promise(function (resolve, rej) {

        if(file){
            let exifdata = null
            /*exif.getData(file, function() {
                exifdata = this.exifdata;
            });
            */
            let resizes = [];

            /*
            if((info_project && original_width <= info_project.max_resize.width && original_height <= info_project.max_resize.height)){            
                resizes.push(originalsize(file,0.8, original_width, original_height));
            }*/
            //resize(file, 1, original_width, original_height));
            /*
            [
                resize(file, 0.6, medium_width, medium_height),
                _original_image
            ]
            */

            resizes.push(resize(file, 0.6, medium_width, medium_height));

            //const blob_original = new Blob([file], {type: file.type});
            
            Promise.all(resizes).then((sources) => {            
                resolve({
                    source_medium:sources[0],/*
                    source_original:{   
                        blob:blob_original                                        
                    },*/
                    quality:1,
                    exifdata
                });       
            });                          
        }
    });
}

const resize = (img, quality, resized_width, resized_height) => {
    return new Promise((res, rej) => {

        

        let width = null;
        let height = null;
        
        new Compressor(img, {
            quality:quality, //qualidade da imagem
            mimeType:"image/jpeg",
            checkOrientation:true,
            maxWidth:resized_width,
            maxHeight:resized_height,
            drew(context, canvas) {
                width = canvas.width;
                height = canvas.height;               
            },
            success(result) {
                res({   
                    blob:result,
                    width:width,
                    height:height
                });
            },
            error(err) {
                console.log(err.message);
            },
        });       
    });
}

/*
const originalsize = (img) => {
    let exifdata = null;
    return new Promise((res) => {
        exif.getData(img, function() {
            exifdata = this.exifdata;
            console.log("exifdata",exifdata);
            const width = img.width;
            const height = img.height;
                res({
                    blob:img,
                    width:width,
                    height:height,
                    quality:validImage(width, height, exifdata) ,//qualidade bom / ruim
                    exifdata
                });
    
         });
     
    });
}
*/
/*const validImage = (width, height, exifdata) => {
    return 1;
}*/
/*

const validImage = (width, height, exifdata) => {
    let result = 0;
           if(exifdata && Object.keys(exifdata).length){
                if(parseFloat(exifdata.XResolution.numerator) > info_project.height ||
                 parseFloat(exifdata.YResolution.numerator) > info_project.width){
                    result = 5;
                }
             }

return result;

}
*/