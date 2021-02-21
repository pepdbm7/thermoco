import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

//reducers:
import authReducer from "./auth/authSlice";
import sensorsReducer from "./sensors/sensorsSlice";

const reducers = combineReducers({
  auth: authReducer,
  sensors: sensorsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "sensors"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
