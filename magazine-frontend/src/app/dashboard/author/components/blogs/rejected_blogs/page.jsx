"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBlogs, deleteExistingBlog } from "@/features/blog/blogThunks";
import RejectedHeader from "../../../../../../components/dashboard/author/blogs/rejected_blogs/RejectedHeader";
import RejectedTable from "../../../../../../components/dashboard/author/blogs/rejected_blogs/RejectedTable";

export default function RejectedBlogsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchMyBlogs("rejected"));
  }, [dispatch]);

  const rejectedBlogs = items?.filter((blog) => blog.blogStatus === "rejected") || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this rejected blog?")) {
      dispatch(deleteExistingBlog(id));
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <RejectedHeader count={rejectedBlogs.length} />
      <div className="mt-8 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <RejectedTable 
          blogs={rejectedBlogs} 
          isLoading={loading} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
}