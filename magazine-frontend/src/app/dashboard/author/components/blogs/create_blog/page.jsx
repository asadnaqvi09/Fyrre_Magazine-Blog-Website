"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/features/category/categorySlice";
import { fetchAllTags } from "@/features/tag/tagSlice";
import { createNewBlog } from "@/features/blog/blogThunks";
import { Save, Send, UploadCloud, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { categories } = useSelector((state) => state.category);
  const { tags } = useSelector((state) => state.tag);
  const { user } = useSelector((state) => state.auth);
  const { loading: blogLoading } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllTags());
  }, [dispatch]);

  // Logic: Calculate Word Count & Read Time
  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormData({ ...formData, title, slug });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (status) => {
    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill required fields (Title, Content, Category)");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    data.append("excerpt", formData.excerpt);
    data.append("category", formData.category);
    data.append("status", status);
    
    // Append tags individually for Multer/Backend array support
    formData.tags.forEach(tagId => data.append("tags[]", tagId));
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    const result = await dispatch(createNewBlog(data));
    if (createNewBlog.fulfilled.match(result)) {
      router.push("/dashboard/author/blogs");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white min-h-screen space-y-8 md:space-y-10">
      {/* Header */}
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-500">Share your thoughts with the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Title Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Blog Title</label>
            <input
              type="text"
              placeholder="e.g. The Future of Minimalism"
              className="w-full text-2xl md:text-3xl font-serif p-0 border-none outline-none focus:ring-0 placeholder:text-gray-200"
              onChange={handleTitleChange}
            />
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <span className="bg-gray-100 px-2 py-0.5 rounded">fyrre.com/blog/{formData.slug || "..."}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Content</label>
                <span className="text-[10px] text-gray-400 font-mono">{wordCount} WORDS</span>
            </div>
            <textarea
              placeholder="Start writing..."
              rows={15}
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-gray-200 outline-none transition-all resize-none leading-relaxed"
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <aside className="space-y-8">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cover Image</label>
            <div className={`border-2 border-dashed rounded-2xl transition-all relative overflow-hidden h-48 flex items-center justify-center ${imagePreview ? 'border-transparent' : 'border-gray-100 hover:bg-gray-50'}`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <UploadCloud className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Upload Header</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                </div>
              )}
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
            <select 
              className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm outline-none"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags Toggle */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => handleTagToggle(tag._id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${
                    formData.tags.includes(tag._id) ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata Info */}
          <div className="p-5 bg-zinc-900 rounded-2xl text-white space-y-4">
            <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Author</p>
                <p className="text-sm">{user?.userName || "Author"}</p>
            </div>
            <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Read Time</p>
                <p className="text-sm">{readTime} min read</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button 
              disabled={blogLoading}
              onClick={() => handleSubmit("Draft")}
              className="flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-xl text-sm font-bold uppercase hover:bg-gray-50 transition-all"
            >
              <Save size={16} /> Save Draft
            </button>
            <button 
              disabled={blogLoading}
              onClick={() => handleSubmit("Pending")}
              className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-xl text-sm font-bold uppercase hover:bg-zinc-800 transition-all disabled:bg-gray-400"
            >
              {blogLoading ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> Submit for Review</>}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}