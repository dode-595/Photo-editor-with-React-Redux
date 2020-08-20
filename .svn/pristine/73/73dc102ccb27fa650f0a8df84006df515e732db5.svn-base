import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import {useDispatch, useSelector} from "react-redux";
import {
    setKeep,
    setDiscarded,
    selectImages,
    selectDiscarded,
    setModalOpen,
    selectImagesPoorQuality, clearImages, loadImageFromProject
} from '../../components/modal-upload-images/uploadSlicer';
import {
    selectIsOpen,
    closeModalReview,
    openModalReUpload,
    closeModalReUpload,
    selectIsOpenReUpload
} from "./modalReviewPhotosSilice";
import {closeModalVales, openModalVales} from "../modal-vales/modalValesSlice";
import AppBar from "@material-ui/core/AppBar";
import {openModalUpsell} from "../modal-upsell/modalUpsellSlice";
import {makeStyles} from "@material-ui/core/styles";
import {getProject} from "../../slices/projectSlice";
import {ImageUploadAPI} from "../../services/db/models/imageUploadAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        borderBottom: '1px solid #ccc'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const ImageLoader = (image) => {

    const [imgurl, setImgurl] = React.useState(null);
    const imageUploadAPI = new ImageUploadAPI();

    React.useEffect(() => {
        let isMounted = true;
        if (image.image.image_meta.image_uuid) {
            imageUploadAPI.getImageByUUID(image.image.image_meta.image_uuid).then((image_db) => {
                if (isMounted)
                    setImgurl(URL.createObjectURL(image_db.modified ? image_db.blob_thumb_modified : image_db.blob_thumb));
            });
        }
        return () => {
            isMounted = false
        };
    }, [image]);

    return (<img style={{
        maxHeight: '280px'
    }} src={imgurl}/>)
}

const ModalReviewPhotosComponent = ({handleClose}) => {
    const classes = useStyles();
    const project = useSelector(getProject);

    const isModalOpen = useSelector(selectIsOpen);
    const isModalReUploadOpen = useSelector(selectIsOpenReUpload);
    const dispatch = useDispatch();
    const images = useSelector(selectImages);
    const discarded = useSelector(selectDiscarded);
    const imagesPoor = useSelector(selectImagesPoorQuality);
    // const [imagesPoor, setImagesPoor] = React.useState(null);


    React.useEffect(() => {
        if (imagesPoor.length === 0 && isModalOpen) {
            dispatch(closeModalReview());
            if (discarded > 0) {
                dispatch(openModalReUpload());
            }
        }
    }, [images]);

    const removeImage = (el) => {
        dispatch(setDiscarded({project, item: el}));
    }
    const keepImage = (el) => {
        dispatch(setKeep({project, item: el}));
    }

    return (
        <React.Fragment>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: '#1c1c1c',
                        color: "white",
                        minHeight: '400px'
                    },
                }}
                fullWidth maxWidth="md" aria-labelledby="simple-dialog-title"
                TransitionComponent={Transition}
                open={isModalOpen}
                onClose={() => {
                    dispatch(closeModalReview());
                }}>
                <Toolbar style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        dispatch(closeModalReview());
                    }} aria-label="close">
                        <Typography variant="body1">Cancelar</Typography>
                    </IconButton>
                </Toolbar>
                <Box p={4}
                     style={{
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignContent: 'center',
                         alignItems: 'center'
                     }}
                >
                    {
                        imagesPoor ?
                            <>
                                <Box mb={4}>
                                    <Typography display="block" variant="body1" align="center">
                                        Você tem {imagesPoor.length} foto{imagesPoor.length > 1 ? 's' : ''} para
                                        revisar.
                                        Escolha entre (lixo) descartar ou
                                        (check) manter a foto.
                                    </Typography>
                                    <Typography display="block" variant="body1" align="center">
                                        Caso escolha descartar a foto, você terá a opção de substituí-la na tela
                                        seguinte
                                    </Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    {

                                        imagesPoor.slice(0, 2).map((el, index) =>
                                            <Grid key={index} item xs={12} md={6}>
                                                <Grid container direction="column" alignItems="center" justify="center">
                                                    <Grid item>
                                                        {/*<img style={{*/}
                                                        {/*    maxHeight: '280px'*/}
                                                        {/*}}*/}
                                                        {/*     src={el.modified ? el.modified : el.original}/>*/}
                                                        <ImageLoader image={el}/>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            onClick={() => removeImage(el)}
                                                        ><DeleteOutlineIcon style={{color: "#fff"}}/>
                                                        </Button>

                                                        <Button
                                                            onClick={() => keepImage(el)}
                                                        ><CheckIcon style={{color: "#fff"}}/></Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </>
                            : ''}
                </Box>

            </Dialog>
            <Dialog
                fullWidth
                maxWidth="md"
                open={isModalReUploadOpen}
                onClose={() =>
                    dispatch(closeModalReUpload())
                }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        minHeight: '400px'
                    }
                }}
            ><AppBar elevation={0} className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={() => {
                                dispatch(closeModalReUpload());
                                dispatch(openModalVales());

                            }}>Pular</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
                <DialogContent>
                    <Grid
                        style={{
                            height: '300px'
                        }}
                        container direction="column" justify="center" alignItems="center" alignContent="center">
                        <Grid item>
                            <DialogContentText id="alert-dialog-description">
                                Voce discartou {discarded} foto{discarded > 1 ? 's' : ''}. e pode fazer o upload de
                                mais {discarded} foto{discarded > 1 ? 's' : ''}.
                            </DialogContentText>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{
                                    backgroundColor: '#31BFFF',
                                    color: 'white',
                                    padding: '10px',
                                    width: '300px'
                                }}
                                onClick={() => {
                                    dispatch(closeModalReUpload());
                                    dispatch(setModalOpen(true));
                                }}
                            >
                                <Typography variant="caption">Fazer upload</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalReviewPhotosComponent;
