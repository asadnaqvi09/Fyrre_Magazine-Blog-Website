import React from "react";
import { Edit3, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function RejectedTable({ blogs, isLoading, onDelete }) {
  if (isLoading) return <div className="p-20 text-center text-gray-400">Loading feedback...</div>;

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50/20">
        <AlertCircle className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-gray-500 font-medium">No rejected blogs found. Good job!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-100 bg-gray-50/30">
            <th className="px-6 py-4 font-normal">Title</th>
            <th className="px-6 py-4 font-normal">Excerpt</th>
            <th className="px-6 py-4 font-normal text-center">Status</th>
            <th className="px-6 py-4 font-normal">Rejected By</th>
            <th className="px-6 py-4 font-normal text-right px-8">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-6 max-w-[300px]">
                <div className="text-sm font-semibold text-zinc-900 truncate">
                  {blog.blogTitle}
                </div>
                <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                  {blog.rejectedReason || "No feedback provided"}
                </div>
              </td>
              <td className="px-6 py-6">
                <p className="text-xs text-gray-500 line-clamp-2 max-w-[250px]">
                  {blog.blogExcerpt}
                </p>
              </td>
              <td className="px-6 py-6 text-center">
                <span className="bg-[#E53E3E] text-white text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-tight">
                  Rejected
                </span>
              </td>
              <td className="px-6 py-6 text-sm text-gray-400">
                {blog.rejectedBy?.userName || "Admin"}
              </td>
              <td className="px-6 py-6">
                <div className="flex items-center justify-end gap-5 text-zinc-400 px-2">
                  <Link 
                    href={`/dashboard/author/blogs/edit/${blog._id}`}
                    className="hover:text-black transition-colors"
                  >
                    <Edit3 size={18} strokeWidth={1.5} />
                  </Link>
                  <button 
                    onClick={() => onDelete(blog._id)}
                    className="hover:text-[#E53E3E] transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}