"use client";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, removeCategory } from "@/features/category/categorySlice";

export default function CategoryTable({ onEdit }) {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, message } = useSelector((state) => state.category);

  useEffect(() => {
    if (!categories?.length && !isLoading && !isError) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories?.length, isLoading, isError]);

  const handleDelete = (categoryId) => {
    if (window.confirm("Delete this category? Articles may become uncategorized.")) {
      dispatch(removeCategory(categoryId));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-gray-500 min-h-[300px] flex items-center justify-center">
        Loading categories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-red-200 bg-red-50/50 rounded-xl p-8 text-center text-red-700">
        {message || "Failed to load categories. Please try again."}
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-gray-500 min-h-[300px] flex items-center justify-center">
        No categories found
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/60 text-gray-500 text-xs font-black uppercase tracking-[0.18em]">
              <th className="py-5 px-7">Category Name</th>
              <th className="py-5 px-7">Articles</th>
              <th className="py-5 px-7 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <tr
                key={cat._id}
                className="hover:bg-slate-50/70 transition-colors duration-150 group"
              >
                <td className="py-5 px-7 font-medium text-slate-900">
                  {cat.categoryName || "Unnamed"}
                </td>
                <td className="py-5 px-7">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium tracking-tight">
                    {cat.articlesCount ?? cat.articleCount ?? cat.articles ?? 0}
                  </span>
                </td>
                <td className="py-5 px-7">
                  <div className="flex justify-end gap-5 text-xs font-semibold tracking-wide">
                    <button
                      onClick={() => onEdit(cat)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors"
                      title="Edit category"
                    >
                      <Edit2 size={15} /> <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 size={15} /> <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}