import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const translateText = createAsyncThunk('translate/translateText', async (data) => {
    const params = new URLSearchParams();
    params.set('source_language', data.sourceLanguage.code);
    params.set('target_language', data.targetLanguage.code);
    params.set('text', data.text);

    const res = await api.post('/translate', params, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });

    return res.data;
})