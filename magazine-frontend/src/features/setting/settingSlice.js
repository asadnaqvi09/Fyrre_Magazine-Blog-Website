import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as settingRepo from "@/lib/repositories/settingRepo";

export const fetchSettings = createAsyncThunk(
  "setting/fetch",
  async (_, thunkAPI) => {
    try {
      return await settingRepo.fetchSettings();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch settings"
      );
    }
  }
);

export const saveSettings = createAsyncThunk(
  "setting/save",
  async ({ settingId, data }, thunkAPI) => {
    try {
      return await settingRepo.updateSettings(settingId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update settings"
      );
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    settings: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSettingStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Settings
      .addCase(saveSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.success = true;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSettingStatus } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;