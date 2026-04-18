import { createAsyncThunk } from "@reduxjs/toolkit";
import * as blogRepo from "@/lib/repositories/blogRepo";

export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (queryParams, { rejectWithValue }) => {
    try {
      return await blogRepo.fetchAllBlogs(queryParams);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "blog/getSingle",
  async (slug, { rejectWithValue }) => {
    try {
      return await blogRepo.fetchBlogBySlug(slug);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewBlog = createAsyncThunk(
  "blog/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await blogRepo.createBlogApi(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteExistingBlog = createAsyncThunk(
  "blog/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      await blogRepo.deleteBlogApi(blogId);
      return blogId; // ID return kar rahe hain taaki state se remove kar saken
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingBlog = createAsyncThunk(
  "blog/update",
  async ({ blogId, formData }, { rejectWithValue }) => {
    try {
      return await blogRepo.updateBlogApi(blogId, formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyBlogs = createAsyncThunk(
  "blog/my-blogs",
  async (_, { rejectWithValue }) => {
    try {
      return await blogRepo.fetchMyBlogs();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your blogs");
    }
  }
);
