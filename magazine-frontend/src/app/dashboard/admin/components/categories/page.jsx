"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import CategoryTable from "@/components/dashboard/admin/categories/CategoryTable";
import TagsTable from "@/components/dashboard/admin/categories/TagManager";
import CategoryModal from "@/components/dashboard/common/CategoryModal";
import { addCategory, editCategory } from "@/features/category/categorySlice";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmitCategory = (categoryData) => {
    if (editingCategory) {
      dispatch(
        editCategory({
          id: editingCategory._id,
          categoryData,
        })
      );
    } else {
      dispatch(addCategory(categoryData));
    }
    handleCloseModal();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:space-y-16 pb-12">
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
              Content Categories
            </h1>
            <p className="text-base text-gray-600">
              Manage your editorial sections and content organization
            </p>
          </div>

          <button
            onClick={handleAddCategory}
            disabled={isLoading}
            className="w-full sm:w-auto bg-slate-900 text-white px-7 py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Category
          </button>
        </div>

        {isError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {message || "Something went wrong while loading categories"}
          </div>
        )}

        <CategoryTable onEdit={handleEdit} />
      </section>

      <section className="pt-12 border-t border-gray-100">
        <TagsTable />
      </section>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingCategory}
        onSubmit={handleSubmitCategory}
        isSubmitting={isLoading}
      />
    </div>
  );
}