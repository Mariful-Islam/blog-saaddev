import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";

const store = configureStore({
    reducer: rootReducers
})

export default store