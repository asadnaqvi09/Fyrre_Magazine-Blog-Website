import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tagRepo from "@/lib/repositories/tagRepo";

export const fetchAllTags = createAsyncThunk(
  "tag/fetchAllTags",
  async (_, thunkAPI) => {
    try {
      return await tagRepo.getTags(); 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching tags");
    }
  }
);

export const addNewTag = createAsyncThunk(
  "tag/addNewTag",
  async (tagData, thunkAPI) => {
    try {
      return await tagRepo.createTag(tagData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error creating tag");
    }
  }
);

export const updateExistingTag = createAsyncThunk(
  "tag/updateExistingTag",
  async ({ tagId, data }, thunkAPI) => {
    try {
      return await tagRepo.updateTag(tagId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error updating tag");
    }
  }
);

export const removeTagAction = createAsyncThunk(
  "tag/removeTag",
  async (tagId, thunkAPI) => {
    try {
      return await tagRepo.deleteTag(tagId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error deleting tag");
    }
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTagError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewTag.fulfilled, (state, action) => {
        state.tags.unshift(action.payload);
      })
      .addCase(updateExistingTag.fulfilled, (state, action) => {
        const index = state.tags.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tags[index] = action.payload;
      })
      .addCase(removeTagAction.fulfilled, (state, action) => {
        const index = state.tags.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tags[index] = action.payload;
      });
  },
});

export const { clearTagError } = tagSlice.actions;
export const tagReducer = tagSlice.reducer;