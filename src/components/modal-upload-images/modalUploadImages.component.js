import React from "react";

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';

import {ReactComponent as GooglePhotosIcon} from "../../assets/image/google_photos.svg";
import {ReactComponent as FacebookIcon} from "../../assets/image/facebook.svg";
import {ReactComponent as InstagramIcon} from "../../assets/image/instagram.svg";
import {ReactComponent as DropBoxIcon} from "../../assets/image/dropbox.svg";
import {ReactComponent as MyComputerIcon} from "../../assets/image/computador-portatil.svg";

import {useSelector, useDispatch} from 'react-redux';
import {
    selectIsOpen,
    setModalClose,
    setModalOpen,
} from './uploadSlicer';


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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ModalUploadImagesComponent = ({handleSelectImages}) => {
    const classes = useStyles();
    const modalIsOpen = useSelector(selectIsOpen);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setModalClose());
    };

    const uploadImages = (event) => {
        handleClose();
        handleSelectImages(event);
    }

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                    style={{
                        backgroundColor: '#31BFFF',
                        color: 'white',
                        border: '1px solid #31BFFF',
                        borderRadius: "50px",
                        padding: '10px 30px 10px 30px',
                        boxShadow: '0px 5px 5px 0px rgba(153,153,153,1)'
                    }}
                    onClick={() => dispatch(setModalOpen())}
                ><AddIcon/> Adicionar fotos
                </Button>
            </Box>
            <Dialog style={{
                margin: '80px 40px 0 40px'
            }}
                    PaperProps={{
                        style: {
                            maxHeight: '800px',
                            height: '800px'
                        }
                    }}
                    fullWidth maxWidth="lg"
                    open={modalIsOpen} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar elevation={0} className={classes.appBar}>
                    <Toolbar>

                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <Box style={{
                                width: '40%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <MyComputerIcon width={35}/>
                                <GooglePhotosIcon width={35}/>
                                <FacebookIcon width={35}/>
                                <InstagramIcon width={35}/>
                                <DropBoxIcon width={35}/>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container style={{
                    height: '100%',
                    padding: '20px',
                }}>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
                         style={{
                             height: '100%',
                             border: '2px dotted #ccc'
                         }}
                    >
                        <MyComputerIcon width={80}/>
                        <Typography variant="h5" color="textSecondary">Computador</Typography>
                        <Box mt={2}>
                            <Typography>Adicione suas fotos favoritas do seu computador</Typography>
                        </Box>
                        <Box mt={2}>
                            <Button
                                onClick={() => {
                                    document.getElementById('search_photos').click();
                                }}
                                style={{
                                    backgroundColor: '#31BFFF',
                                    color: 'white',
                                    padding: '10px',
                                    width: '300px'
                                }}
                            ><Typography variant="caption">Selecionar Fotos</Typography></Button>
                            <input
                                accept="image/x-png,image/gif,image/jpeg,image/heic"
                                id="search_photos"
                                style={{
                                    display: 'none'
                                }} type="file" multiple={true} onChange={uploadImages}/>
                        </Box>
                        <Box mt={2}>
                            <Typography>ou</Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography>Arraste aqui suas fotos</Typography>
                        </Box>
                    </Box>
                </Container>
            </Dialog>
        </Box>
    );
}

export default React.memo(ModalUploadImagesComponent);
