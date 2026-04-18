"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBlogs, deleteExistingBlog, updateExistingBlog } from "@/features/blog/blogThunks";
import DraftHeader from "../../../../../../components/dashboard/author/blogs/draft_blogs/DraftHeader";
import DraftTable from "../../../../../../components/dashboard/author/blogs/draft_blogs/DraftTable";

export default function DraftBlogsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchMyBlogs("draft"));
  }, [dispatch]);

  const drafts = items?.filter((blog) => blog.blogStatus === "draft") || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      dispatch(deleteExistingBlog(id));
    }
  };

  const handlePublish = (id) => {
    dispatch(updateExistingBlog({ blogId: id, formData: { blogStatus: "published" } }));
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <DraftHeader count={drafts.length} />
      <div className="mt-8 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <DraftTable 
          blogs={drafts} 
          isLoading={loading} 
          onDelete={handleDelete}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}