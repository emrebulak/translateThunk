import { createSlice } from "@reduxjs/toolkit"
import { translateText } from "../actions/translateAction"

const initialState = {
    isLoading: false,
    error: null,
    answer: ''
}

 const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            state.answer = action.payload;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(translateText.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(translateText.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        builder.addCase(translateText.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.answer = action.payload.data.translatedText
        })
    }
})

export default translateSlice.reducer

export const { setAnswer } = translateSlice.actions