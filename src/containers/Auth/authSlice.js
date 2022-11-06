import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../constants";

export const autoLogout = createAsyncThunk(
  "quiz/autoLogout",
  async ({ time }) => {
    return new Promise((res) => {
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expirationDateTime");
        res();
      }, time);
    });
  }
);
export const auth = createAsyncThunk(
  "quiz/auth",
  async ({ email, password, isLogin }, ...args) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    // set url as login or registration
    let url;
    if (isLogin) {
      url = Constants.authApiUrl;
    } else {
      url = Constants.registerApiUrl;
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const currentDateTime = new Date().getTime();
    const expiresTimeMs = data.expiresIn * 1000;
    const expirationDateTime = new Date(
      currentDateTime + expiresTimeMs
    ).getTime();

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDateTime", expirationDateTime);

    // args[0].dispatch(autoLogout({ time: expirationDateTime }));

    return { token: data.idToken, expirationDateTime };
  }
);

const sliceName = "authSlice";

const initialState = {
  token: null,
  expirationDateTime: null,
};

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    autoLogin: (state, { payload }) => {
      state.token = payload.token;
      state.expirationDateTime = payload.expirationDateTime;
    },
    logout: (state) => {
      state.token = null;
      state.expirationDateTime = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDateTime");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.expirationDateTime = payload.expirationDateTime;
    });
    builder.addCase(autoLogout.fulfilled, (state) => {
      state.token = null;
      state.expirationDateTime = null;
    });
  },
});

export const { autoLogin, logout } = authSlice.actions;
export default authSlice.reducer;
