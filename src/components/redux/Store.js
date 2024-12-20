import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice"
import farmerReducer from "./slices/FarmerSlice"
import officerReducer from "./slices/OfficerSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        farmer : farmerReducer,
        officer : officerReducer
    }
})