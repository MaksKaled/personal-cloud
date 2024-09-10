import {ADD_FILE} from '../actions/fileActions'
import { fetchFiles } from '../actions/fileThunks';

const initialState = {
    files:[],
    loading:false,
    error:null
}

export default function filesReducer(state = initialState, action){
    switch (action.type) {
        case ADD_FILE:
            return{
                ...state,
                files:[ ...state.files,action.payload]
            };
        case fetchFiles.pending.type:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case fetchFiles.fulfilled.type:
            return{
                ...state,
                files:action.payload,
                loading:false,
                error:null,
            };
        case fetchFiles.rejected.type:
            return{
                ...state,
                loading:false,
                error:action.error.message,
            };
        default:
            return state;
    }
}

