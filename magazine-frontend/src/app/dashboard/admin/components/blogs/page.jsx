"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/features/blog/blogThunks";
import BlogFilters from "@/components/dashboard/admin/blogs/BlogFilters";
import BlogTable from "@/components/dashboard/admin/blogs/BlogTable";
import Pagination from "@/components/dashboard/common/Pagination";

const ITEMS_PER_PAGE = 5;

export default function BlogPage() {
  const dispatch = useDispatch();
  
  const { list, status } = useSelector((state) => state.blogs) || { list: [], status: "idle" };
  const articles = Array.isArray(list) ? list : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") dispatch(getAllBlogs());
  }, [status, dispatch]);

  const categories = useMemo(() => {
    return [...new Set(articles.map((a) => a.category?.name).filter(Boolean))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        article.title?.toLowerCase().includes(search) ||
        article.author?.userName?.toLowerCase().includes(search) ||
        article.author?.name?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || article.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        article.category?.name === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchQuery, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter]);

  if (status === "loading") {
    return (
      <div className="p-10 text-gray-400 font-serif animate-pulse text-xl">
        Loading Magazine Articles...
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-6">
      <BlogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <BlogTable data={paginatedArticles} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}