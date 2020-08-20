import React from "react";
import Box from "@material-ui/core/Box";
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {useSelector, useDispatch} from "react-redux";
import {getIsOpen, setClose} from "./subMenuSlicer";
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import {makeStyles} from "@material-ui/core/styles";

import {getCurrent, setCurrent} from "./subMenuSlicer";

import {getProject, updateProject} from "../../../slices/projectSlice";
import db from '../../../services/db/db';
import ModalUploadImagesComponent from "../../modal-upload-images/modalUploadImages.component";
import {Route} from "react-router-dom";
import {setIsUploading} from "../progress-bar/progressBarSlice";
import {setIsUpload} from "../../modal-upload-images/uploadSlicer";
import {resizeImage} from "../../../utils/utils_new";
import {v4 as uuidv4} from "uuid";
import Button from "@material-ui/core/Button";
import ItemsCarousel from "react-items-carousel";

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '0px',
        width: '100% !important',
        "&:hover": {
            backgroundColor: "#f5f5f5",
        }
    },
    MenuItem: {
        width: '100%'
    },
    isActive: {
        border: '1px solid #ccc',
    }
}));

export const Menu = ({children, title, subtitle, caption, disabled, isActive, handleClick}) => {
    const classes = useStyles();

    return (
        <IconButton className={classes.button} onClick={handleClick} disabled={disabled}>
            <Grid spacing={2} container alignItems="center" className={isActive ? classes.isActive : ''}>
                <Grid item>
                    {children}
                </Grid>
                <Grid item xs>
                    <Grid container direction="column" alignItems="baseline" justify="space-between">
                        <Typography variant="caption" color="textPrimary">{title}</Typography>
                        {!isActive ?
                            <>
                                <Typography variant="caption">{subtitle}</Typography>
                                <Typography variant="caption" color="textPrimary">{caption}</Typography>
                            </>
                            : <Typography variant="caption" color="textPrimary">Íncluso</Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </IconButton>
    );
}


export const PaperMenu = () => {
    const classes = useStyles();
    const project = useSelector(getProject);
    const dispatch = useDispatch();

    const setPaper = (type) => {
        dispatch(updateProject({
            project, fields: {
                'paper_type': type
            }
        }));
    }

    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            {
                project.paper_types.map((el, index) =>
                    <Grid item className={classes.MenuItem} key={index}>
                        <Menu title={el.title} subtitle={el.subtitle} caption={`+ R$ ${el.price} por foto`}
                              disabled={project.product_paper_type > el.type}
                              handleClick={() => setPaper(el.type)} isActive={project.paper_type === el.type}>
                            <WallpaperOutlinedIcon style={{fontSize: 40}}/>
                        </Menu>
                    </Grid>
                )
            }

        </Grid>
    );
}
export const PaperSize = () => {
    const classes = useStyles();
    const project = useSelector(getProject);
    const dispatch = useDispatch();

    const setPaperSize = (type) => {
        dispatch(updateProject({
            project, fields: {
                'paper_size': type
            }
        }));
    }
    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            {
                project.paper_sizes.map((el, index) =>
                    <Grid item className={classes.MenuItem} key={index}>
                        <Menu title={el.title} caption={el.price}
                              disabled={project.product_paper_size > el.type}
                              handleClick={() => setPaperSize(el.type)} isActive={project.paper_size === el.type}>
                            <PhotoSizeSelectSmallIcon style={{fontSize: 40}}/>
                        </Menu>
                    </Grid>
                )
            }
        </Grid>
    )
}
export const AutoOptimization = () => {
    const classes = useStyles();
    const project = useSelector(getProject);
    const dispatch = useDispatch();

    const setAutoOptimization = (type) => {
        dispatch(updateProject({
            project, fields: {
                'auto_optimization': type
            }
        }));
    }
    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item className={classes.MenuItem}>
                <h4>Auto Otimização</h4>
                <Switch
                    checked={project.auto_optimization}
                    onChange={() => {
                        setAutoOptimization(!project.auto_optimization)
                    }}
                    color="secondary"
                    name="checkedB"
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            </Grid>
        </Grid>
    );
}

const PhotosGifts = () => {
    const project = useSelector(getProject);
    const [images, setImages] = React.useState([]);
    const dispatch = useDispatch();

    // const uploadImages = (event) => {
    //     let files = event.target.files;
    //     dispatch(setIsUploading());
    //     dispatch(setIsUpload(true));
    //
    //     const files_arr = Array.from(files);
    //
    //     const handlefiles = (_files_arr) => {
    //         const images = [];
    //         const json_images = [];
    //
    //         const files_arr_20 = _files_arr.splice(0, 20);
    //         files_arr_20.forEach((el, index) => {
    //             images.push(resizeImage(el, project.min_resize.width, project.min_resize.height));
    //         });
    //         Promise.all(images).then((images_resized) => {
    //             images_resized.forEach(el => {
    //                 json_images.push({
    //                     "uuid": uuidv4(),
    //                     "project_uuid": project.uuid,
    //                     "blob_original": el.source_medium.blob,
    //                     "blob_medium": el.source_medium.blob,
    //                     "blob_medium_modified": null,
    //                     "blob_thumb": el.source_medium.blob,
    //                     "blob_thumb_modified": null,
    //                     "width": el.source_medium.width,
    //                     "height": el.source_medium.height,
    //                     "quality": el.source_medium.quality,
    //                     "modified": false,
    //                     "uploaded": false
    //                 });
    //             });
    //             console.log("images_resized",images_resized);
    //             db.images_upload.bulkAdd(json_images, null, {allKeys: true}).then((resp) => {
    //                 console.log('resp', resp);
    //                 let imageUploadIds = resp;
    //             });
    //         });
    //     }
    //     handlefiles(files_arr);
    // }

    React.useEffect(() => {
        db.images_upload.where({project_uuid: project.uuid}).toArray().then(resp => {
            setImages(resp);
        });
    }, []);

    return (<div>

        {/*<ModalUploadImagesComponent handleSelectImages={uploadImages}/>*/}

        {
            images.length > 0 ?
                images.flatMap((el, index) => (
                    <img key={index} width="100%"
                         src={URL.createObjectURL(el.modified ? el.blob_medium_modified : el.blob_medium)}
                         alt=""/>
                )) : ''

        }
    </div>);
}
const ThemesEditor = () => {
    const project = useSelector(getProject);

    return (
        <div>
            <Box p={2}>
                <TextField size="small" variant="outlined" fullWidth id="standard-basic" label="Procure um design"/>
            </Box>

            {
                project.templates.map((el, index) => (
                        <div key={index}>
                            {el.categorie}
                            {
                                el.items.map((item, index) => (
                                    <Button key={index} fullWidth key={index}
                                            onClick={() => {

                                            }}
                                            style={{
                                                height: 140,
                                                borderRadius: 10,
                                                padding: 2,
                                                overflow: 'hidden',
                                                background: '#EEE',
                                                maxWidth: 300,
                                                marginTop: 4
                                            }}>
                                        <Box>
                                            {item.name}
                                        </Box>
                                    </Button>
                                ))
                            }
                        </div>
                    )
                )
            }
        </div>
    );
}

const ModelsEditor = () => {
    const project = useSelector(getProject);

    return (
        <Box>
            {
                project.models.map((el, index) => (
                        <div key={index}>
                            <Button key={index} fullWidth key={index}
                                    onClick={() => {
                                        alert('alterado '+el.name);
                                    }}
                                    style={{
                                        height: 140,
                                        borderRadius: 10,
                                        padding: 2,
                                        overflow: 'hidden',
                                        background: '#EEE',
                                        maxWidth: 300,
                                        marginTop: 4
                                    }}>
                                <Box>
                                    {el.name}
                                    {el.price}
                                </Box>
                            </Button>
                        </div>
                    ))
            }
        </Box>
    );
}

const NewTextEditor = () => {


    return (
        <React.Fragment>
        <Box>
            <Button style={{
                backgroundColor: '#31BFFF',
                color: 'white'
            }}>Adicionar novo texto</Button>
        </Box>
            <Box mt={2}>
                <TextField size="small" variant="outlined" placeholder="Selecione a fonte" />
            </Box>
        </React.Fragment>

    )
}

const SubMenuComponent = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsOpen);
    const current = useSelector(getCurrent);

    React.useEffect(() => {
        return () => {
            window.removeEventListener("click", addEvent);
        }
    }, [])

    const addEvent = function (e) {
        if (!document.getElementById('subMenu').contains(e.target)
            && !document.getElementById('sideBar')?.contains(e.target)) {
            dispatch(setClose());
            dispatch(setCurrent(null));
            window.removeEventListener("click", addEvent);
        }

    }

    const renderMenu = () => {
        switch (current) {

            case 'paper_type':
                return <PaperMenu/>
                break;

            case 'paper_size':
                return <PaperSize/>
                break;

            case 'auto_optimization':
                return <AutoOptimization/>
                break;

            case 'photos_editor':
                return <PhotosGifts/>
                break;

            case 'themes_editor':
                return <ThemesEditor/>
                break;

            case 'themes_size':
                return <PaperSize/>
                break;

            case 'themes_model':
                return <ModelsEditor/>
                break;

            case 'themes_text':
                return <NewTextEditor/>
                break;
        }
    }

    return (
        <Slide
            onEntered={() => {
                window.addEventListener("click", addEvent);
            }} direction="right" in={isOpen}>
            <Box id="subMenu" style={{
                height: 'calc(100% - 64px)',
                width: '230px',
                position: 'absolute',
                zIndex: '999',
                backgroundColor: 'white',
                borderRight: '1px solid rgba(0,0,0,0.12)',
                padding: '8px'
            }}>
                {renderMenu()}
            </Box>
        </Slide>
    );

}

export default SubMenuComponent;
