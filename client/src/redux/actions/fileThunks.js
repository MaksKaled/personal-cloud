import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SERVER_URL } from "../../envVariables";


export const fetchFiles = createAsyncThunk('files/fetchFiles',async () => {
    
    const response = await axios.get(`${SERVER_URL}/api/files`);
    return response.data;
})


export const deleteFile = createAsyncThunk('files/deleteFile', async (filePath,{rejectWithValue}) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/deleteFile`,{
            headers:{
                'Content-Type':'application/json',
            },
            data:{filePath}
        })
        if(response.status === 200){
            return filePath;
        }else{
            rejectWithValue('ошибка при удалении файла')
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
})