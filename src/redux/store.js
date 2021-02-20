import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import sensorsReducer from "./sensors/sensorsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    sensors: sensorsReducer,
  },
});
