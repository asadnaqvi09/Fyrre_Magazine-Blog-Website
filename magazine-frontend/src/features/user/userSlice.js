"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userRepo from "@/lib/repositories/userRepo.js";

const handleThunkError = (err, rejectWithValue) => 
  rejectWithValue(err.response?.data || err.message);

export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepo.fetchAllUsersApi();
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const fetchAuthors = createAsyncThunk("user/fetchAuthors", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepo.fetchAuthorsApi();
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const promoteToAuthor = createAsyncThunk("user/promoteToAuthor", async (args, { rejectWithValue }) => {
  try {
    const response = await userRepo.promoteToAuthorApi(args);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const revokeAuthor = createAsyncThunk("user/revokeAuthor", async (args, { rejectWithValue }) => {
  try {
    const response = await userRepo.revokeAuthorApi(args);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const fetchAdminBlogs = createAsyncThunk("user/fetchAdminBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepo.fetchAdminBlogsApi();
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const approveBlog = createAsyncThunk("user/approveBlog", async (args, { rejectWithValue }) => {
  try {
    const response = await userRepo.approveBlogApi(args);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const getAuthorProfile = createAsyncThunk("user/getAuthorProfile", async (args, { rejectWithValue }) => {
  try {
    const response = await userRepo.getAuthorProfileApi(args);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (args, { rejectWithValue }) => {
  try {
    const response = await userRepo.updateAuthorProfileApi(args);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await userRepo.deleteUserApi(userId);
    return userId;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

export const rejectBlog = createAsyncThunk("user/rejectBlog", async ({ blogId, reason }, { rejectWithValue }) => {
  try {
    const response = await userRepo.rejectBlogApi(blogId, reason);
    return response.data;
  } catch (err) { return handleThunkError(err, rejectWithValue); }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    adminBlogs: [],
    authorProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.data?.users || action.payload?.users || [];
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.data?.authors || action.payload?.authors || [];
      })
      .addCase(fetchAdminBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.adminBlogs = action.payload?.data?.blogs || action.payload?.blogs || [];
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addMatcher(
        (action) => [promoteToAuthor.fulfilled.type, revokeAuthor.fulfilled.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          const updated = action.payload?.data?.user || action.payload?.user;
          if (updated?._id) {
            const index = state.users.findIndex((u) => u._id === updated._id);
            if (index !== -1) state.users[index] = { ...state.users[index], ...updated };
          }
        }
      )
      .addMatcher(
        (action) => [approveBlog.fulfilled.type, rejectBlog.fulfilled.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          const updated = action.payload?.data?.blog || action.payload?.blog;
          if (updated?._id) {
            state.adminBlogs = state.adminBlogs.map((b) => (b._id === updated._id ? updated : b));
          }
        }
      )
      .addMatcher(
        (action) => [getAuthorProfile.fulfilled.type, updateProfile.fulfilled.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.authorProfile = action.payload?.data?.author || action.payload?.author || null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Operation failed";
        }
      );
  },
});

export const { resetState } = userSlice.actions;
export const userReducer = userSlice.reducer;