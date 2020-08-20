import {createSlice} from '@reduxjs/toolkit';

export const progressBarSlice = createSlice({
    name: "progressBar",
    initialState: {
        isUploading: false,
        totalPercent: 0,
        uploaded:0,
        total:0
    },
    reducers: {
        setIsUploading: (state,action) => {
            if(state.isUploading != action.payload){
                state.isUploading = action.payload
            }
        },
        setPercent: (state, action) => {
            /*console.log("SET PERCENTEE",action.payload.total);
            state.totalPercent = action.payload.total;
            if (state.totalPercent >= 100) {
                state.isUploading = false;
                state.totalPercent = 0;
            }*/
        },
        setTotal: (state,action)=>{
            state.total = action.payload
        },

        addUploaded:(state,action)=>{
            state.uploaded++;
            state.totalPercent = state.uploaded/state.total*100;
        }

         
    }
});
export const {setIsUploading, setPercent, addUploaded, setTotal} = progressBarSlice.actions;
export const getPercent = state => state.progressBar.totalPercent;
export const getIsloading = state => state.progressBar.isUploading;
export default progressBarSlice.reducer;
