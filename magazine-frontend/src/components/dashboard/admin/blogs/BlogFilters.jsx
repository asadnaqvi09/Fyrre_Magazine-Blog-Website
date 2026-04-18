"use client";
import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

export default function BlogFilters({ 
  searchQuery, setSearchQuery, statusFilter, 
  setStatusFilter, categoryFilter, setCategoryFilter, categories 
}) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 md:p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        
        <div className="relative flex-1 group w-full">
          <Search className="absolute hidden md:block left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent focus:border-slate-200 focus:bg-white outline-none text-sm text-gray-700 transition-all rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 md:flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:min-w-[160px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-100 cursor-pointer rounded-lg"
            >
              <option value="All">Status</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>

          <div className="relative flex-1 lg:min-w-[180px]">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-100 cursor-pointer rounded-lg"
            >
              <option value="All">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}