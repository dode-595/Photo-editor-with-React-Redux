import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Skeleton from '@material-ui/lab/Skeleton';


import ModalCropperComponent from "../modal-cropper/modalCropper.component";
import AlertQuantityComponent from "../alert-quantity/alertQuantity.component";
import ImageLoader from "../photos/imageLoader.component";

import { resizeImage } from "../../utils/utils_new";

import { useSelector, useDispatch } from 'react-redux';
import {
    selectImagesPaginated,
    selectImagesPaginatedNext,
    setNextPage,
    setPrevPage,
    increment,
    decrement,
    remove, clearImages, loadImageFromProject, loadImageBas64, selectImages
} from '../../components/modal-upload-images/uploadSlicer';
import { editImage } from '../../slices/editImageSlicer';
import { getProject } from "../../slices/projectSlice";
import { ImageUploadAPI } from "../../services/db/models/imageUploadAPI";

const LoaderComponent = () => {
    return (
        <React.Fragment>
            <Box display="flex">
                {
                    Array.from(new Array(3)).map((item, index) => (
                        <Box key={index} width={210} height={118}>
                            <Skeleton variant="rect" width={210} height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    ))
                }
            </Box>
        </React.Fragment>
    )
}


const PhotosComponent = ({project}) => {    
    const dispatch = useDispatch();
    const photos = useSelector(selectImagesPaginated);
    const photos_next = useSelector(selectImagesPaginatedNext);
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [alertOpen, setAlertOpen] = React.useState(false);        
    const [images, setImages] = React.useState([]);    
    const imageUploadAPI = new ImageUploadAPI();

    React.useEffect(() => {        
        if (project.id) {
            dispatch(clearImages());
            dispatch(loadImageFromProject({project_id:project.id})).then((a)=>{
                console.log(a);
            });

        }
    }, [project.id]);

    React.useEffect(() => {
        if (photos.length > 0) {
            const promise = photos.map(container_item => {
                return new Promise((resolve, rej) => {
                    
                    imageUploadAPI.get(container_item.image_meta.image_uuid).then((imageBD) => {
                        if (!imageBD?.is_resized) {
                            resizeImage(imageBD.blob_original, project.min_resize.width, project.min_resize.height)
                                .then((resized) => {
                                    const newImage = {
                                        uuid: imageBD.uuid,
                                        blob_medium: resized.source_medium.blob,
                                        height: resized.source_medium.height,
                                        width: resized.source_medium.width,
                                        is_resized: true
                                    }
                                    imageUploadAPI.update(imageBD.uuid, newImage).then(() => {
                                        
                                        resolve(container_item);
                                    });
                                });
                        } else {
                            resolve(container_item);
                        }
                    });
                });
            });
            Promise.all(promise).then((retorno) => {
                
                setImages(retorno);
            });
        }

    }, [photos]);

    React.useEffect(() => {
        if (photos_next.length > 0) {
            photos_next.forEach(container_item => {
                imageUploadAPI.get(container_item.image_meta.image_uuid).then((imageBD) => {
                    if (!imageBD?.is_resized) {
                        resizeImage(imageBD.blob_original, project.min_resize.width, project.min_resize.height)
                            .then((resized) => {                                
                                const newImage = {
                                    uuid: imageBD.uuid,
                                    blob_medium: resized.source_medium.blob,
                                    height: resized.source_medium.height,
                                    width: resized.source_medium.width,
                                    is_resized: true
                                }
                                imageUploadAPI.update(imageBD.uuid, newImage).then(() => {
                                
                                
                            });
                        });
                    }
                });                
            });
        }

    }, [photos_next]);

    const nextPage = () => {
        
        dispatch(setNextPage());
    }
    const prevPage = () => {
        
        dispatch(setPrevPage());
    }
    const handleEditImage = (el) => {
        setSelectedImage(el);
        dispatch(editImage(el));
        setOpen(true);
    }
    const handleCloseEditImage = () => {
        setSelectedImage(null);
        setOpen(false);
    }
    const handleCloseAlert = (el) => {
        setSelectedImage(null);
        setAlertOpen(false);
    }
    const decrementQuantity = (el) => {
        setSelectedImage(el);
        if (el.quantity === 1) {
            setAlertOpen(true);
            return;
        }
        dispatch(decrement({item: el, project_id:project.id}));
    }
    const incrementQuantiy = (el) => {
        dispatch(increment({item: el, project_id:project.id}));
    }

    const removeImage = () => {
        dispatch(remove({project_id:project.id, image: selectedImage})).then((e) => {
            setAlertOpen(false);
        });
    }

    return (
        <React.Fragment>
            <ModalCropperComponent isOpen={open} handleClose={handleCloseEditImage} image={selectedImage} />
            <AlertQuantityComponent isOpen={alertOpen} handleClose={handleCloseAlert}
                handleRemove={() => removeImage(selectedImage)} />
            {
                images.length > 0 ?
                    <Grid container spacing={2}>
                        {
                            images.map((el, index) => (
                                <Grid key={index} item xs={12} md={6} lg={2} style={{
                                    marginBottom: '20px'
                                }}>
                                    <Box display="flex" flexDirection="column" mb={2}>

                                        <Box onClick={() => handleEditImage(el)}>
                                            <ImageLoader image_uuid={el.image_meta.image_uuid}
                                                modified={el.image_meta.modified} />
                                        </Box>
                                        <Box mt={1}>
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => decrementQuantity(el)}><RemoveIcon /></IconButton>

                                                <input
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "4px",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "2px",
                                                        marginLeft: "4px",
                                                        marginRight: "4px"
                                                    }}
                                                    onChange={() => {
                                                    }}
                                                    type="text" size="3" value={el.quantity} />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => incrementQuantiy(el)}><AddIcon /></IconButton>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                    : ''
            }

            {
                photos.length === 0 ? (<Box p={4}>Nenhuma foto encontrada</Box>) : ''
            }
            <IconButton onClick={() => {
                dispatch(setPrevPage());
            }}>-</IconButton>
            <IconButton onClick={() => {
                dispatch(setNextPage());
            }}>+</IconButton>
        </React.Fragment>
    );
};

export default PhotosComponent; //React.memo(
