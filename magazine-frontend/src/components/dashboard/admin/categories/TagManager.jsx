"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllTags, addNewTag, removeTagAction } from "@/features/tag/tagSlice";

export default function Tags() {
  const dispatch = useDispatch();
  const { tags, loading } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const handleAddTag = () => {
    const tagName = prompt("Enter new tag name:");
    if (tagName) {
      dispatch(addNewTag({ tagName }));
    }
  };

  const handleDelete = (tagId) => {
    if (window.confirm("Are you sure you want to deactivate this tag?")) {
      dispatch(removeTagAction(tagId));
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Tags</h2>
        <p className="text-sm text-gray-400 mt-1">Keywords for better content discovery</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={tag._id}
              className={`flex items-center justify-between gap-2 bg-white border ${!tag.isActive ? 'bg-gray-50 opacity-60' : 'border-gray-200'} px-3 py-2.5 rounded-lg hover:border-slate-900 transition-all group`}
            >
              <span className="text-[11px] font-bold text-slate-700 truncate flex items-center gap-1">
                <Hash size={12} className="text-slate-300" /> {tag.tagName}
              </span>
              {tag.isActive && (
                <button
                  onClick={() => handleDelete(tag._id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={handleAddTag}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-100 rounded-lg text-gray-400 hover:border-slate-900 hover:text-slate-900 transition-all text-xs font-bold disabled:opacity-50"
        >
          <Plus size={16} /> Add
        </button>
      </div>
    </div>
  );
}