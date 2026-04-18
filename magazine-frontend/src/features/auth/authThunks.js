import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authRepo from "@/lib/repositories/authRepo";

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    return await authRepo.loginUser(credentials);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    return await authRepo.registerUser(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    return await authRepo.refreshAccessToken();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Token refresh failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authRepo.logoutUser();
  } catch (error) {
    console.error("Logout failed:", error);
  }
});