"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBlogs, deleteExistingBlog } from "@/features/blog/blogThunks";
import BlogTable from "../../../../../../components/dashboard/author/blogs/my_blogs/BlogTable";
import BlogHeader from "../../../../../../components/dashboard/author/blogs/my_blogs/BlogHeader";

export default function MyBlogsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  const filteredBlogs = items?.filter((blog) =>
    blog.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteExistingBlog(id));
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <BlogHeader onSearch={setSearchTerm} />
      <div className="mt-6 border border-gray-100 rounded-lg overflow-hidden">
        <BlogTable 
          blogs={filteredBlogs} 
          isLoading={loading} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
}