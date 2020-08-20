import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Logo from "../../assets/image/logo.png";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';

import db from '../../services/db/db';

import SubMenuComponent from "../../components/ui/sub-menu/subMenu.component";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {selectImages, setImage, setIsUpload, setModalOpen} from "../../components/modal-upload-images/uploadSlicer";
import DesignListComponent from "../../components/ui/design-list/designList.component";
import {getProject, loadSelectedProject, updateProject} from "../../slices/projectSlice";
import {Route, Switch, useHistory} from "react-router-dom";
import MenuGiftComponent from "./menu/menu.component";
import List from "@material-ui/core/List";
import {v4 as uuidv4} from "uuid";
import {setIsUploading, setPercent} from "../../components/ui/progress-bar/progressBarSlice";
import {resizeImage} from "../../utils/utils_new";
import ModalUploadImagesComponent from "../../components/modal-upload-images/modalUploadImages.component";

const drawerWidth = 140;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px 0 20px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        marginTop: '15px'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflowZ: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    secondNav: {
        position: 'fixed',
        height: document.documentElement.scrollHeight - theme.mixins.toolbar.minHeight,
        margin: 0,
        padding: 0,
        overflowY: 'scroll'
    },
    containerContent: {
        padding: '20px'
    },
    buttonPhooto: {
        backgroundColor: 'rgb(250,122,97)',
        background: 'linear-gradient(55deg, rgba(250,122,97,1) 0%, rgba(251,166,22,1) 100%)',
        color: 'white',
        padding: '10px',
        paddingLeft: '20px',
        paddingRight: '20px'
    }
}));


const DesignsList = ({project, handleClick}) => {
    return (
        <React.Fragment>
            <Box display="flex" p={4} justifyContent="flex-end" alignItems="flex-center">
                <Box width={1 / 4}>
                    <Typography variant="subtitle1" color="textSecondary">Escolha o design</Typography>
                </Box>
                <Box width={1 / 4}>
                    <TextField variant="outlined" fullWidth id="standard-basic" label="Procure um design"/>
                </Box>
            </Box>
            {project.templates ?
                project.templates.map((el, index) => (
                    <DesignListComponent key={index} label={el.categorie} items={el.items}
                                         handleClick={handleClick}/>
                ))
                : ''
            }
        </React.Fragment>
    )
}

const GiftsPage = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const reduceImages = useSelector(selectImages);
    const [open, setOpen] = React.useState(false);
    const project = useSelector(getProject);

    React.useEffect(() => {
        if (!project.id) {
            dispatch(loadSelectedProject()).then((project) => {
                if (project.error) {
                    history.push("/");
                }
            });
        }
        if (props.location.pathname === '/gifts/editor') {
            setOpen(true);
        } else {
            setOpen(false);
        }
        dispatch(setModalOpen());
    }, [props.location]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const setDesign = (design) => {
        const container_uuid = uuidv4();
        let container = {
            "uuid": container_uuid,
            "background": {
                "type": "color",
                "color": "#000000",
                "url": ""
            },
            "width": 15,
            "height": 19,
            "radius": 0,
            "margins": {
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 0
            },
            "cover": 0,
            "items": []
        };
        container.items.push(...design.template);
        const _myproject = {...project};
        _myproject.containers = container;
        dispatch(updateProject({project, fields: _myproject})).then(res => {
            if (!res.error) {
                history.push('/gifts/editor');
            }
            console.log('res', res);
        });
    }
    const uploadImages = (event) => {
        let files = event.target.files;
        dispatch(setIsUploading());
        dispatch(setIsUpload(true));

        const files_arr = Array.from(files);

        const handlefiles = (_files_arr) => {
            const images = [];
            const json_images = [];

            const files_arr_20 = _files_arr.splice(0, 20);
            files_arr_20.forEach((el, index) => {
                images.push(resizeImage(el, project.min_resize.width, project.min_resize.height));
            });
            Promise.all(images).then((images_resized) => {
                images_resized.forEach(el => {
                        json_images.push({
                            "uuid": uuidv4(),
                            "project_uuid": project.uuid,
                            "blob_original": el.source_medium.blob,
                            "blob_medium": el.source_medium.blob,
                            "blob_medium_modified": null,
                            "blob_thumb": el.source_medium.blob,
                            "blob_thumb_modified": null,
                            "width": el.source_medium.width,
                            "height": el.source_medium.height,
                            "quality": el.source_medium.quality,
                            "modified": false,
                            "uploaded": false
                        });
                });
                console.log("images_resized",images_resized);
                db.images_upload.bulkAdd(json_images, null, {allKeys: true}).then((resp) => {
                    console.log('resp', resp);
                    let imageUploadIds = resp;
                });
            });
        }
        handlefiles(files_arr);
    }

    return (
        <div className={classes.root}>

            <CssBaseline/>
            <AppBar elevation={0} className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Box hidden={props.location.pathname !== '/gifts/editor'}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <img src={Logo} alt="" width="120"/>
                    </Typography>

                    <React.Fragment>
                        <Box hidden={props.location.pathname === '/gifts/editor'}>
                            <Button
                                onClick={() => {
                                    history.push('/gifts/editor');
                                }}
                            >Pular</Button>
                        </Box>
                    </React.Fragment>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <MenuGiftComponent/>

                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <SubMenuComponent/>

                <Paper elevation={0}>
                    <Box className={classes.containerContent}>


                        <Switch>
                            <Route exact path='/gifts'>
                                <DesignsList project={project} handleClick={setDesign}/>
                            </Route>
                            <Route exact path='/gifts/editor'>
                                editor

                                <ModalUploadImagesComponent handleSelectImages={uploadImages}/>

                            </Route>
                        </Switch>


                    </Box>
                </Paper>

            </main>

            {/*<ModalDesignsComponent modalOpen={false}/>*/}
            {/*<ModalAlertLowQuality*/}
            {/*    openModal={() =>{}}*/}
            {/*    handleClose={() =>{}}/>*/}

            {/*<ModalReviewPhotosComponent/>*/}

            {/*<ModalValesComponent/>*/}
            {/*<ModalUpsellComponent/>*/}

        </div>
    );

}

export default GiftsPage;
