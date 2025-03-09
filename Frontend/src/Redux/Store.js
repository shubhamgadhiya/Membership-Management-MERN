import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Reducer/AuthReducer";
import DashboardReducer from "./Reducer/DashboardReducer";
export const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        Dashboard: DashboardReducer,
    }
})