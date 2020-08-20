import React from "react";
import Box from "@material-ui/core/Box";
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';

const imageUploadAPI = new ImageUploadAPI();

const ImageLoader = ({image_uuid,modified}) => {
    //console.log("render",image_uuid);
    const [imgurl, setImgurl] = React.useState(null);


    React.useEffect(() => {        
        if(image_uuid){
            console.log('image_uuid',image_uuid);
            imageUploadAPI.getImageByUUID(image_uuid).then((image_db)=>{
                if(image_db.blob_medium){
                    setImgurl(URL.createObjectURL(image_db.modified?image_db.blob_medium_modified:image_db.blob_medium));
                }
            });
        }
        
    }, [image_uuid,modified]);

       

    return (

        <React.Fragment> 
            
            <Box                
                style={{
                    cursor: "pointer",
                    width: "100%",
                    minHeight: "140px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "relative",
                    backgroundImage:`url(${imgurl})`
                }}>                    
                    
                </Box> 

        </React.Fragment>
    );
};

/*function areEqual(prevProps, nextProps) {
    return true;
}*/
export default ImageLoader;
