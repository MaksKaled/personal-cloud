import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SERVER_URL } from "../../envVariables";


export const fetchFiles = createAsyncThunk('files/fetchFiles',async () => {
    
    const response = await axios.get(`${SERVER_URL}/api/files`);
    return response.data;
})