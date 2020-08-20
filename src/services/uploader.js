

import {ImageUploadAPI} from './db/models/imageUploadAPI';
import {ProjectAPI} from './db/models/projectAPI';
import {DromosAPI} from './api/dromosAPI';
import {
    setPercent, setIsUploading, addUploaded
} from '../components/ui/progress-bar/progressBarSlice';
import store from '../store/store';
const imageUploadAPI = new ImageUploadAPI(); 
const projectAPI = new ProjectAPI(); 

const dromosAPI = new DromosAPI();


class Uploader {       

    constructor(){
        this.images_to_upload = [];
        this.contador = 0;
    }

    initUpload(project_uuid) {        
       
        
        console.log("this.images_to_upload.length",this.images_to_upload.length);
        if(this.images_to_upload.length == 0){
            imageUploadAPI.listByProject(project_uuid).then(res => {            
                if(this.images_to_upload.length == 0){                    
                    res.each((obj) => {                  
                        if(!obj.uploaded){       
                            this.images_to_upload.push(obj);  
                            }                          
                    }).then(()=>{
                                    
                        if(this.images_to_upload.length > 0){
                            this.uploadImageS3(this.images_to_upload, project_uuid);
                        } else {
                            console.log("nothing to upload");
                            //store.dispatch(setIsUploading(false));
                            
                        }
                    });
                }
            });
        }
    }
    
    uploadImageS3(images_to_upload, project_uuid) {
        const _images_to_upload = this.images_to_upload.splice(0,5);
        let new_uploads = [];
        _images_to_upload.forEach((obj) => {
            if(!obj.uploaded){   
        
                let new_upload = dromosAPI.upload(project_uuid,obj).then((x)=>{
                    if(x.data.success){
                        
                        this.contador++;
                        console.log("contador",this.contador);
                        //store.dispatch(addUploaded());
                        
                        imageUploadAPI.save({uuid:obj.uuid,uploaded:true}); //blob_original:null
                    }

                    return x;
                });
        
                new_uploads.push(new_upload);
            }                
        });

        Promise.all(new_uploads).then((a)=>{
           
            /*a.forEach((response_upload)=>{
                console.log("response_upload",response_upload);
            })*/

            //

            if(this.images_to_upload.length > 0){
            
                setTimeout(()=>this.uploadImageS3(this.images_to_upload, project_uuid) ,500);                            
            } else {
                this.initUpload();
            }
        });                  

    }     
}

export default (new Uploader);