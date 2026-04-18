"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, X, ArrowRight, HandMetal } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "@/features/blog/blogThunks";

export default function MagazineList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get("category");
  const dispatch = useDispatch();
  const { items: articles, status: blogStatus } = useSelector(state => state.blogs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPopularOnly, setIsPopularOnly] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState({});

  useEffect(() => {
    if (blogStatus === "idle") dispatch(getAllBlogs());
  }, [dispatch, blogStatus]);

  useEffect(() => {
    if (urlCategory) setSelectedCategories([urlCategory]);
  }, [urlCategory]);

  const toggleFilter = (item, list, setList) => {
    const updated = list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
    
    setList(updated);

    if (setList === setSelectedCategories) {
      updated.length === 1 
        ? router.push(`/blogs?category=${encodeURIComponent(updated[0])}`)
        : router.push("/blogs");
    }
  };

  const handleLike = (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedBlogs(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const filteredBlogs = useMemo(() => {
    let result = articles.filter(blog => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(blog.category.name);
      return categoryMatch ;
    });

    if (isPopularOnly) result = [...result].sort((a, b) => b.views - a.views);
    return result;
  }, [articles, selectedCategories, isPopularOnly]);

  const uniqueCategories = [...new Set(articles.map(b => b.category.name))];

  if (blogStatus === "loading") {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-6 px-10 py-12 bg-white min-h-screen">
      <div className="flex justify-between items-center border-b border-black pb-4 relative">
        <h2 className="text-sm font-black uppercase tracking-[0.2em]">Categories</h2>
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2 hover:opacity-60">
          {isFilterOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
        </button>

        {isFilterOpen && (
          <div className="absolute top-12 right-0 w-72 bg-white border border-black p-6 z-50">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-40 mb-3">Categories</p>
                {uniqueCategories.map(cat => (
                  <label key={cat} className="flex gap-2 text-xs font-bold uppercase">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
              <label className="flex gap-2 text-xs font-black uppercase border-t pt-4">
                <input
                  type="checkbox"
                  checked={isPopularOnly}
                  onChange={() => setIsPopularOnly(!isPopularOnly)}
                />
                🔥 Sort By Popular
              </label>

              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setIsPopularOnly(false);
                  router.push("/blogs");
                }}
                className="text-[10px] font-bold uppercase underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-black">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="p-8 border-r border-b border-black flex flex-col gap-6 group">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span>{blog.publishedAt}</span>
              <span className="border px-3 py-1">{blog.category.name}</span>
            </div>

            <Link href={`/blogs/${blog.slug}`} className="relative aspect-[4/3] overflow-hidden">
              <Image src={blog.blogImg} alt={blog.title} fill className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>

            <h3 className="text-3xl font-black">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.excerpt}</p>

            <div className="mt-auto flex flex-col gap-4">
              <div className="flex gap-6 text-[10px] uppercase font-bold justify-between">
                <p>Duration : {blog.readTime}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black">
                <button
                  onClick={(e) => handleLike(blog.id, e)}
                  className="flex items-center gap-2 text-xs font-bold uppercase hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {/* <HandMeDown 
                    size={18} 
                    className={likedBlogs[blog.id] ? "fill-black" : ""} 
                  /> */}
                  <HandMetal size={18} className={likedBlogs[blog.id] ? "fill-black" : ""} />
                  <span>{blog.likes || 0} Claps</span>
                </button>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-2 text-xs font-bold uppercase border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
                >
                  Read Article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}