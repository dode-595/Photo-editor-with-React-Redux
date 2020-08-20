import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import {useSelector, useDispatch} from "react-redux";
import {getPercent, getIsloading, setTotal} from "./progressBarSlice";

import {
    selectCountImages
} from '../../modal-upload-images/uploadSlicer';


const ProgressBarComponent = () => {
    const dispatch = useDispatch();
    const _totalPercent = useSelector(getPercent);    
    const countImages = useSelector(selectCountImages);
    
    React.useEffect(() => {        
        dispatch(setTotal(countImages));
        
    }, [countImages]);

    const ColorLinearProgress = withStyles({
        colorPrimary: {
            backgroundColor: '#bedbfc',
        },
        barColorPrimary: {
            backgroundColor: '#32BEFC',
        },
    })(LinearProgress);


    return (
        
                
        <Box style={{
            width: "100%",
            position: "absolute",
            top: "60px",
            zIndex: "1300",
            left: '0'
        }}>
            <ColorLinearProgress variant="determinate"  value={_totalPercent}/>
        </Box>
                    
        
    );
}
export default ProgressBarComponent;
