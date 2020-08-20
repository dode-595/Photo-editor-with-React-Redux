import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProjectAPI} from '../../services/db/models/projectAPI';
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';
import {v4 as uuidv4} from 'uuid';

const imageUploadAPI = new ImageUploadAPI();
const projectAPI = new ProjectAPI();


//TODO: add pagination
export const loadImageFromProject = createAsyncThunk(
    'image/loadImageFromProject',
    async (payload, thunkAPI) => {

        const project = await projectAPI.get(payload.project_id);

        let items = [];

        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                items.push(item)
            });
        });
        return items;
    }
);

export const updateImage = createAsyncThunk(
    'image/updateImage',
    async (payload, thunkAPI) => {

        const project = await projectAPI.get(payload.project.id);
        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                if (payload.image.uuid == item.uuid) {
                    item.image_meta.transformation_data.push(payload.transform);
                }
            });
        });

        await imageUploadAPI.update(payload.image.image_meta.image_uuid, {
            blob_medium_modified: payload.modified,
            blob_thumb_modified: payload.modified_thumb,
            modified: true
        });

        await projectAPI.save(project);

        return {image_uuid: payload.image.image_meta.image_uuid, transform: payload.transform}

    }
);

export const redefineImage = createAsyncThunk(
    'image/redefineImage',
    async (payload, thunkAPI) => {
        const project = await projectAPI.get(payload.project.id);
        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                if (payload.image.uuid == item.uuid) {
                    item.image_meta.transformation_data = []
                }
            });
        });

        await imageUploadAPI.update(payload.image.image_meta.image_uuid, {
            blob_medium_modified: null,
            blob_thumb_modified: null,
            modified: false
        });

        await projectAPI.save(project);

        return {image_uuid: payload.image.image_meta.image_uuid}

    }
);

export const remove = createAsyncThunk(
    'image/remove',
    async (payload, thunkAPI) => {
        let updated_project = await projectAPI.get(payload.project_id);
        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {
                if (item.image_meta.image_uuid == payload.image.image_meta.image_uuid) {
                    updated_project = projectAPI.removeItem(updated_project, item.uuid, true);
                }
            });
        });

        await projectAPI.save(updated_project);

        await imageUploadAPI.deleteByImageByUUID(payload.image.image_meta.image_uuid);

        return {image_uuid: payload.image.image_meta.image_uuid}
    }
);


export const increment = createAsyncThunk(
    'image/increment',
    async (payload, thunkAPI) => {
        let updated_project = await projectAPI.get(payload.project_id);

        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {

                if (item.uuid == payload.item.uuid) {
                    item.quantity += 1;
                }
            });
        });

        await projectAPI.save(updated_project);


        return {item: payload.item}

    }
);

export const decrement = createAsyncThunk(
    'image/decrement',
    async (payload, thunkAPI) => {

        let updated_project = await projectAPI.get(payload.project_id);

        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {

                if (item.uuid == payload.item.uuid) {
                    item.quantity -= 1;
                }
            });
        });
        await projectAPI.save(updated_project);
        return {item: payload.item}
    }
);


export const setKeep = createAsyncThunk(
    'image/setKeep',
    async (payload, thunkAPI) => {
        let updated_project = await projectAPI.get(payload.project.id);
        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {
                if (item.uuid == payload.item.uuid) {
                    item.isKeeping = true;
                }
            });
        });
        await projectAPI.save(updated_project);
        return {item: payload.item}

    }
);

export const setDiscarded = createAsyncThunk('image/setDiscarded',
    async (payload, thunkAPI) => {
        let updated_project = await projectAPI.get(payload.project.id);
        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {
                if (item.image_meta.image_uuid == payload.item.image_meta.image_uuid) {
                    updated_project = projectAPI.removeItem(updated_project, item.uuid, true);
                }
            });
        });

        await projectAPI.save(updated_project);

        await imageUploadAPI.deleteByImageByUUID(payload.item.image_meta.image_uuid);

        return {image_uuid: payload.item.image_meta.image_uuid}

    }
);

export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        value: [],
        discarded: 0,
        open: false,
        isReUploading: false,
        isUploading: false,
        page: 1,
        perPage: 15
    },
    reducers: {
        // setKeep: (state, action) => {
        //     const _image = state.value.find(el => el.index === action.payload.index);
        //     _image.isKeeping = true;
        // },
        // setDiscarded: (state, action) => {
        //     const index = state.value.findIndex(el => el.index === action.payload.index);
        //     state.value.splice(index, 1);
        //     state.discarded += 1;
        // },

        setModalClose: state => {
            state.open = false;
        },
        setModalOpen: (state, action) => {
            state.isReUploading = action.payload || false;
            state.open = true;
        },
        setIsUpload: (state, action) => {
            state.isUploading = action.payload
        },
        clearImages: (state, action) => {
            state.value = [];
        },
        setImage: (state, action) => {
            if (state.isReUploading) {
                state.discarded = 0;
                state.isReUploading = false;
            }
            state.value = ([...state.value, ...action.payload]);
        },
        setNextPage:(state,action) =>{
            state.page++;
        },
        setPrevPage:(state,action) =>{
            state.page--;
        }
    },
    extraReducers: {
        [setDiscarded.fulfilled]: (state, action) => {
            const index = state.value.findIndex(el => el.image_meta.image_uuid === action.payload.image_uuid);
            state.value.splice(index, 1);
            state.discarded += 1;
        },
        [setKeep.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.item.image_meta.image_uuid);
            _image.isKeeping = true;

            state.value = [...new Set([...state.value,_image])]
        },

        [loadImageFromProject.fulfilled]: (state, action) => {
            state.value = action.payload;
        },
       
        [updateImage.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image_uuid);

            _image.image_meta.transformation_data.push(action.payload.transform);
            _image.image_meta.modified = true;
        },
        [redefineImage.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image_uuid);
            _image.image_meta.transformation_data = [];
            _image.image_meta.modified = false;
        },
        [remove.fulfilled]: (state, action) => {

            const index = state.value.findIndex(el => el.image_meta.image_uuid === action.payload.image_uuid);
            state.value.splice(index, 1);
        },
        [increment.fulfilled]: (state, action) => {

            const _item = state.value.find(el => el.uuid === action.payload.item.uuid);
            _item.quantity += 1;
        },
        [decrement.fulfilled]: (state, action) => {

            const _item = state.value.find(el => el.uuid === action.payload.item.uuid);
            _item.quantity -= 1;
        },
        [redefineImage.rejected]: (state, action) => {
            console.log("rejected redefineImage");
            console.log(state);
            console.log(action);
        },
        [updateImage.rejected]: (state, action) => {
            console.log("rejected updateImage");
            console.log(state);
            console.log(action);
        },


    }
});

export const {
    setModalOpen, setModalClose, setIsUpload, clearImages, setImage, setNextPage,setPrevPage
} = uploadSlice.actions;

export const selectCountImages = state => state.upload.value.length;
export const selectImages = state => state.upload.value.filter(el => el.quantity >= 1);
export const selectImagesPaginated = state => state.upload.value.slice((state.upload.page-1)*state.upload.perPage,state.upload.page*state.upload.perPage);
export const selectImagesPaginatedNext = state => state.upload.value.slice((state.upload.page)*state.upload.perPage,(state.upload.page+1)*state.upload.perPage);

export const selectImagesPoorQuality = state => state.upload.value.filter(el => el.quality < 2 && el.isKeeping === false);
export const selectDiscarded = state => state.upload.discarded;
export const selectIsOpen = state => state.upload.open;
export const selectIsUploading = state => state.upload.isUploading;

export default uploadSlice.reducer;
