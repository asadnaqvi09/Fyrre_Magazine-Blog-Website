"use client";
import React from "react";
import { updateExistingBlog } from "@/features/blog/blogThunks";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogTable({ data }) {
  const dispatch = useDispatch();
  const handleStatusChange = (blogId, newStatus) => {
    dispatch(updateExistingBlog({ blogId, formData: { status: newStatus } }));
  };
  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full border-collapse text-left min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              <th className="py-5 px-6 font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em]">Article Details</th>
              <th className="py-5 px-6 font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em]">Author</th>
              <th className="py-5 px-6 font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] text-center">Status</th>
              <th className="py-5 px-6 font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em]">Publish Date</th>
              <th className="py-5 px-6 font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {data.map((blog) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={blog.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-5 px-6 max-w-md">
                    <div className="font-bold text-slate-900 text-xs md:text-sm mb-0.5 truncate group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-gray-400 line-clamp-1 italic">
                      {blog.excerpt || blog.subtitle}
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                        {blog.author?.name?.charAt(0)}
                      </div>
                      {blog.author?.name}
                    </div>
                  </td>

                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[7px] md:text-[9px] font-black border uppercase tracking-widest ${blog.status === "Published" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                        blog.status === "Pending" ? "bg-amber-50 border-amber-100 text-amber-600" :
                          "bg-red-50 border-red-100 text-red-600"
                      }`}>
                      {blog.status}
                    </span>
                  </td>

                  <td className="py-5 px-6 text-xs text-gray-500 font-mono">
                    {blog.publishedAt}
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center justify-end">
                      <div className="relative">
                        <select
                          value={blog.status}
                          onChange={(e)=> handleStatusChange(blog._id || blog.id, e.target.value)}
                          className="text-[10px] font-black uppercase border border-gray-200 p-4 rounded-lg bg-white cursor-pointer hover:border-slate-900 outline-none transition-all appearance-none shadow-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Published">Approve</option>
                          <option value="Rejected">Reject</option>
                        </select>
                        <ChevronDownIcon size={10} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {data.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="p-20 text-center"
          >
            <div className="text-slate-300 mb-2 font-serif text-4xl">No Results</div>
            <p className="text-sm text-gray-400">Try adjusting your filters or search query.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ChevronDownIcon({ size, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}