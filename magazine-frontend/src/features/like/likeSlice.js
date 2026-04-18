import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as likeRepo from "@/lib/repositories/likeRepo";

export const handleLikeToggle = createAsyncThunk(
  "like/toggle",
  async (blogId, thunkAPI) => {
    try {
      return await likeRepo.toggleLike(blogId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLikeToggle.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLikeToggle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleLikeToggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const likeReducer = likeSlice.reducer;