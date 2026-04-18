"use client";

import { useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, deleteExistingBlog } from "@/features/blog/blogThunks";
import { motion } from "framer-motion";

export default function RecentSubmissions() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.blogs) || { list: [], status: "idle" };
  
  const articles = Array.isArray(list) ? list : [];

  const topArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllBlogs());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      dispatch(deleteExistingBlog(id));
    }
  };

  if (status === "loading") {
    return (
      <div className="p-10 space-y-4">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
        <div className="h-40 w-full bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          Recently Submitted
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">Latest content awaiting review</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Title</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Author</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topArticles.length > 0 ? (
                topArticles.map((article) => (
                  <tr key={article._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 px-6 max-w-xs">
                      <div className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1 leading-relaxed">
                        {article.excerpt || "No excerpt provided"}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-700 font-medium">
                      {article.author?.userName || "Unknown"}
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                        {article.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        article.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {article.status || "Draft"}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-end gap-3">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-900">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(article._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400 text-sm">
                    No recent submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}