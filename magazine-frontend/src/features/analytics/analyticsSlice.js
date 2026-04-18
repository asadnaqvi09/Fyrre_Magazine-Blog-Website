import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as analyticsRepo from "@/lib/repositories/analyticsRepo";

export const getAdminAnalytics = createAsyncThunk(
  "analytics/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsRepo.fetchAdminAnalytics();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admin analytics");
    }
  }
);

export const getAuthorAnalytics = createAsyncThunk(
  "analytics/fetchAuthor",
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsRepo.fetchAuthorAnalytics();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch author analytics");
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    adminData: {
      totalViews: 0,
      viewerSplit: [],
      topBlogs: [],
      topAuthors: []
    },
    authorData: {
      TotalViews: 0,
      perBlogAnalytics: []
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Admin Reducers
      .addCase(getAdminAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(getAdminAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Author Reducers
      .addCase(getAuthorAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthorAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.authorData = action.payload;
      })
      .addCase(getAuthorAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;