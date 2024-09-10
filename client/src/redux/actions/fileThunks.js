import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFiles = createAsyncThunk('files/fetchFiles',async () => {
    const response = await axios.get('http://localhost:5000/api/files');
    return response.data;
})