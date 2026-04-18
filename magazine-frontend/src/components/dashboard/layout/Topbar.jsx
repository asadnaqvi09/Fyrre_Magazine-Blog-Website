"use client";

import { User, Menu } from "lucide-react";

export default function TopBar({ title, setIsOpen }) {
  return (
    <header className="h-20 border-b border-gray-100 px-4 md:px-12 flex items-center justify-between bg-white sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 lg:hidden text-slate-600 hover:bg-slate-50 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-serif text-slate-900 truncate">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">Admin User</p>
          <p className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Super Admin</p>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
          <User size={20} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}