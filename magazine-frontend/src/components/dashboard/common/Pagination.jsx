"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 pt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 md:px-4 md:py-2 text-[10px] font-black uppercase border rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-colors"
      >
        <ChevronLeft size={16} className="md:hidden" />
        <span className="hidden md:inline">Prev</span>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 text-[10px] font-black border rounded-lg transition-all ${
                page === currentPage
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200 scale-110"
                  : "bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 md:px-4 md:py-2 text-[10px] font-black uppercase border rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-colors"
      >
        <ChevronRight size={16} className="md:hidden" />
        <span className="hidden md:inline">Next</span>
      </button>
    </div>
  );
}