import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllBlogs, 
  getSingleBlog, 
  createNewBlog, 
  deleteExistingBlog, 
  updateExistingBlog, 
  fetchMyBlogs 
} from "./blogThunks";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    pagination: {},
    currentBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    resetCurrentBlog: (state) => {
      state.currentBlog = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Getting All Blogs on BlogCatalogue,Admin Dashboard
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.blogs;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch blogs";
      })

      // Getting Single Blog on BlogDetails Page
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload.data.blog;
      })

      // Create New Blog
      .addCase(createNewBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.data.blog);
      })
      .addCase(createNewBlog.rejected, (state,action)=> {
        state.loading = false;
        state.error = action.payload?.message || "Something Went Wrong";
      })

      // Update Blog
      .addCase(updateExistingBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingBlog.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = action.payload.data.blog;
        state.items = state.items.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        );
        if (state.currentBlog?._id === updatedBlog._id) {
          state.currentBlog = updatedBlog;
        }
      })
      .addCase(updateExistingBlog.rejected, (state,action)=> {
        state.loading = false;
        state.error = action.payload?.message || "Something Went Wrong";
      })

      // Delete Blog
      .addCase(deleteExistingBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteExistingBlog.rejected, (state,action)=> {
        state.loading = false;
        state.error = action.payload?.message || "Something Went Wrong";
      })

      // Fetch Own Blogs By Author
      .addCase(fetchMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.blogs;
      })
      .addCase(fetchMyBlogs.rejected, (state,action)=> {
        state.loading = false;
        state.error = action.payload?.message || "Something Went Wrong";
      });
  },
});

export const { clearBlogError, resetCurrentBlog } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;