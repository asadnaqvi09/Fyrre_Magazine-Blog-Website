import { createSlice } from "@reduxjs/toolkit";
import { login, register, refreshToken, logout } from "./authThunks";

const getInitialAuth = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

const initialState = {
  isAuthenticated: !!getInitialAuth(),
  token: getInitialAuth()?.token || null,
  user: getInitialAuth()?.user || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(register.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(register.rejected, (state, action) => { state.error = action.payload; })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("auth");
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("auth");
      });
  },
});

export const authReducer = authSlice.reducer;