import React from "react";
import { Edit3, Eye, Trash2, FileText, Plus } from "lucide-react";
import Link from "next/link";

const StatusBadge = ({ status }) => {
  const isPublished = status?.toLowerCase() === "published";
  return (
    <span className={`px-4 py-1 text-[11px] font-medium rounded-full border ${
      isPublished 
        ? "bg-black text-white border-black" 
        : "bg-gray-100 text-gray-500 border-gray-200"
    }`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function BlogTable({ blogs, isLoading, onDelete }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-sm text-gray-400 font-medium">Fetching your stories...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <FileText className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No blogs found</h3>
        <p className="text-gray-500 text-sm max-w-xs mt-2">
          It looks like you haven't published any articles yet or your search didn't match anything.
        </p>
        <Link href="/dashboard/author/blogs/create_blog">
          <button className="mt-6 flex items-center gap-2 text-sm font-medium text-black hover:underline">
            <Plus className="w-4 h-4" />
            Write your first blog
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-100">
            <th className="px-6 py-4 font-normal">Title</th>
            <th className="px-6 py-4 font-normal">Category</th>
            <th className="px-6 py-4 font-normal">Status</th>
            <th className="px-6 py-4 font-normal">Date</th>
            <th className="px-6 py-4 font-normal">Views</th>
            <th className="px-6 py-4 font-normal text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-5 text-sm font-medium text-gray-800">{blog.blogTitle}</td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 border border-gray-200 text-xs rounded-full text-gray-500">
                  {blog.blogCategory?.name || "General"}
                </span>
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={blog.blogStatus} />
              </td>
              <td className="px-6 py-5 text-sm text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </td>
              <td className="px-6 py-5 text-sm text-gray-400">
                {blog.blogViews?.toLocaleString() || "—"}
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-4 text-gray-400">
                  <Link href={`/dashboard/edit/${blog._id}`} className="hover:text-black transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <Link href={`/blog/${blog.blogSlug}`} className="hover:text-black transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => onDelete(blog._id)} className="hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
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