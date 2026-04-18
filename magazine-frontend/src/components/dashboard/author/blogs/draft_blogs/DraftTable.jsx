import React from "react";
import { Edit3, Send, Trash2, FileEdit } from "lucide-react";
import Link from "next/link";

export default function DraftTable({ blogs, isLoading, onDelete, onPublish }) {
  if (isLoading) return <div className="p-20 text-center text-gray-400 animate-pulse">Loading drafts...</div>;

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50/30">
        <FileEdit className="w-12 h-12 text-gray-200 mb-4" />
        <p className="text-gray-500 font-medium">No drafts available</p>
        <Link href="/dashboard/author/blogs/create_blog" className="text-black text-sm underline mt-2">
          Start writing a new post
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-100 bg-gray-50/50">
            <th className="px-6 py-4 font-normal">Title</th>
            <th className="px-6 py-4 font-normal">Category</th>
            <th className="px-6 py-4 font-normal">Last Updated</th>
            <th className="px-6 py-4 font-normal text-right px-10">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-6 text-sm font-medium text-zinc-800">
                {blog.blogTitle}
              </td>
              <td className="px-6 py-6">
                <span className="px-4 py-1 border border-gray-100 text-[11px] rounded-full text-gray-500 font-medium">
                  {blog.blogCategory?.name || "Uncategorized"}
                </span>
              </td>
              <td className="px-6 py-6 text-sm text-gray-400">
                {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-6">
                <div className="flex items-center justify-end gap-5 text-zinc-400 px-4">
                  <Link 
                    href={`/dashboard/author/blogs/edit/${blog._id}`} 
                    className="hover:text-black transition-colors"
                    title="Edit Draft"
                  >
                    <Edit3 size={18} strokeWidth={1.5} />
                  </Link>
                  <button 
                    onClick={() => onPublish(blog._id)}
                    className="hover:text-black transition-colors"
                    title="Publish Now"
                  >
                    <Send size={18} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={() => onDelete(blog._id)}
                    className="hover:text-red-500 transition-colors"
                    title="Delete Draft"
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