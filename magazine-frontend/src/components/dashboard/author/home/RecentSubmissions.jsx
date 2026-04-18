"use client";

import { useEffect } from "react";
import { Eye, Trash2, ExternalLink } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBlogs, deleteExistingBlog } from "@/features/blog/blogThunks";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RecentSubmissions() {
  const dispatch = useDispatch();
  // Fixed: selector matches blogSlice initialState 'items'
  const { items: articles, loading } = useSelector((state) => state.blogs);
  
  useEffect(() => {
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog permanently?")) {
      dispatch(deleteExistingBlog(id));
    }
  };

  // Sort and get latest 5
  const topArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading && articles.length === 0) {
    return <div className="h-64 bg-gray-50 animate-pulse rounded-xl" />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Recently Submitted</h2>
        <p className="text-gray-500 text-sm">Track your latest content status</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400">
              <tr>
                <th className="py-4 px-6">Content</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topArticles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 text-sm">{article.title}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">
                      {article.category?.name || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        article.status === "Pending" ? "bg-amber-50 text-amber-600" : 
                        article.status === "Rejected" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${article.slug}`} className="p-2 hover:bg-gray-100 rounded-lg">
                        <ExternalLink size={16} />
                      </Link>
                      <button onClick={() => handleDelete(article._id)} className="p-2 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}