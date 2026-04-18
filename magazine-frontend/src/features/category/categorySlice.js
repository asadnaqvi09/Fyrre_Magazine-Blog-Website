import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryRepo from "@/lib/repositories/categoryRepo";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryRepo.getCategories();
      return response.data?.data?.categories || response.data?.categories || response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await categoryRepo.createCategory(categoryData);
      return response.data?.data?.category || response.data?.category;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add category");
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await categoryRepo.updateCategory(id, categoryData);
      return response.data?.data?.category || response.data?.category;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await categoryRepo.deleteCategory(id);
      dispatch(fetchCategories()); // Refetch after soft-delete to reflect isActive changes
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetState: () => ({
      categories: [],
      isLoading: false,
      isError: false,
      message: "",
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.unshift(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;