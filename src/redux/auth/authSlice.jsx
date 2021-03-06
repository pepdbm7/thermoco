import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";
import api from "../../utils/api";

export const tryLogin = createAsyncThunk("getToken", async (loginData) => {
  const {
    data: { access_token = "" },
  } = await api.post(`auth/login`, qs.stringify(loginData), {
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return {
    fulfilled: !!access_token,
    token: access_token,
    rejected: !access_token,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    status: {
      type: "idle",
      error: null,
    },
  },
  reducers: {
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: {
    [tryLogin.fulfilled]: (state, action) => {
      state.status.type = "succeeded";
      state.token = action.payload.token;
    },
    [tryLogin.rejected]: (state, action) => {
      state.status.type = "failed";
      state.status.error = action.error.message;
    },
  },
});

export default authSlice.reducer;

export const getToken = (state) => state.auth.token;
export const { logout } = authSlice.actions;
