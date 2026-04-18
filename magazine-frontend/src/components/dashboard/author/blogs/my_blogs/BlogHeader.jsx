import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function BlogHeader({ onSearch }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Link href="/dashboard/create-blog">
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
          Create New Blog
        </button>
      </Link>
    </div>
  );
}