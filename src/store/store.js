import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import fromSlice from "./slices/fromSlice/fromSlice";

export let store = configureStore({
    reducer: {
        counter: counterReducer,
        formData: fromSlice,
    }
})