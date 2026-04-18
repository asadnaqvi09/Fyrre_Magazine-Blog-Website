"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryModal({ isOpen, onClose, initialData, onSubmit, isSubmitting }) {
  const [categoryName, setCategoryName] = useState(initialData?.categoryName || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ categoryName, isActive });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-md p-8 sm:rounded-2xl shadow-2xl relative z-10 rounded-t-[2rem]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors">
          <X size={20} className="text-slate-400" />
        </button>

        <h2 className="text-2xl font-serif font-bold mb-8 text-slate-900">
          {initialData ? "Edit Category" : "New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Category Name
            </label>
            <input
              autoFocus
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Science"
              className="w-full bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white p-4 rounded-xl outline-none transition-all text-sm font-semibold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Active Status
            </label>
            <select
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
              className="w-full bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white p-4 rounded-xl outline-none transition-all text-sm font-semibold"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !categoryName.trim()}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Create Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}