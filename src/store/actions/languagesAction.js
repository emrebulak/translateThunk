import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"

export const getLanguages = createAsyncThunk('languages/getLanguages', async () => {
    const res = await api.get('/getLanguages');

    return res.data.data.languages;
});

