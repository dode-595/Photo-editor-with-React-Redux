import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectImages, setImages, setIsUpload} from '../modal-upload-images/uploadSlicer';
import axios from 'axios';
import {config} from './config';
import {sha256} from '../../utils/sha256';
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';
import {ProjectAPI} from '../../services/db/models/projectAPI';
import {setPercent, setIsUploading} from "../ui/progress-bar/progressBarSlice";
const imageUploadAPI = new ImageUploadAPI(); 
const projectAPI = new ProjectAPI(); 

const msg_exit = 'Gostaria mesmo de sair desta página?';
const base_api = 'http://dromos-955020369.us-west-2.elb.amazonaws.com/';

let images_upload = 1;
let imgs_send = [];
let pop_exit = false;
let contador = 0;

export const S3Upload = function(){ 
    const dispatch = useDispatch();
    const files = useSelector(selectImages);
        React.useEffect(() => {
            initUpload();
        }, [files]);

        React.useEffect(() => {
            window.onbeforeunload = function(){
                if(pop_exit){
                    return msg_exit;
                }
            };
        }, []);
   
        function uploadSlide(){   
            dispatch(setIsUploading());
            dispatch(setIsUpload(true));
            const images_upload_length = parseInt(localStorage.getItem('img_slide_upload'));
            const percent = Math.round((images_upload / images_upload_length) * 100);
                dispatch(setPercent({'total': percent}));
                if (percent >= 100) {
                    dispatch(setIsUpload(false));
                    pop_exit = false;
                }else{
                    pop_exit = true;
                }
                images_upload++;
        }

        function setUploadImage(obj,is_upload) {
            obj.uploaded = is_upload;
            if(is_upload){
                obj.blob_original = '';
            }
           imageUploadAPI.save(obj).catch((exception)=>{
                console.log("exception new",exception);
            });  
        }
        
         function initUpload() {
             projectAPI.getActive().then(project => {
                if(project){
                    listImagesLocalDb(project.uuid);
                }             
           });        
        }
        
         function listImagesLocalDb(project_uuid) {
            const imageApi = new ImageUploadAPI();
            imageApi.listByProject(project_uuid).then(res => {
            
                const images_to_upload = [];
                res.each((obj) => {      
                    if(!obj.uploaded){       
                        images_to_upload.push(obj);  
                      }                          
                }).then(()=>{
                                
                    if(images_to_upload.length > 0){
                       uploadImageS3(images_to_upload, project_uuid);
                    }
                });
            });
        }
        
         function uploadImageS3(images_to_upload, project_uuid) {
            const _images_to_upload = images_to_upload.splice(0,5);
            
            _images_to_upload.forEach((obj) => {
                if(!obj.uploaded){   
                    if(!in_array(obj.uuid, imgs_send)){
                          imgs_send.push(obj.uuid);
                    
                          let bodyParameters = new FormData();
                          bodyParameters.append('project_uuid', project_uuid);
                          bodyParameters.append('file', obj.blob_original);
                          bodyParameters.append('origin', 'manual');
                          bodyParameters.append('hash', '123');
                          bodyParameters.append('exifdata', obj.exifdata);
                          bodyParameters.append('channel_uuid', obj.uuid);
                        
                          contador++;                        
                          /*axios.post(base_api+'api/image/upload', bodyParameters, config)
                          .then((resp) => {
                              setUploadImage(obj,true);
                              //uploadSlide();
                              //console.log(resp);

                          }).catch((err) => {
                              console.log(err);
                          }); */
                    }
                 }
                 
            });

             if(images_to_upload.length > 0){
                
                setTimeout(()=>uploadImageS3(images_to_upload, project_uuid) ,2000);                            
            }

        }

        function in_array(needle, haystack) {
            for(var i in haystack) {
                if(haystack[i] == needle) return true;
            }
            return false;
        }


 return [];
}

export const S3Delete = function(selectedImage){

    console.log('delete '+selectedImage);

 return [];
}



export default [S3Upload,S3Delete];