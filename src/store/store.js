import { configureStore } from "@reduxjs/toolkit";
import languagesSlice from "./slices/languagesSlice";
import translateSlice from "./slices/translateSlice";

export default configureStore({
    reducer: {
        languagesSlice,
        translateSlice
    }
})