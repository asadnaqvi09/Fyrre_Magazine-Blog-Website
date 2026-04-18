"use client";

import { useEffect,use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogBySlug } from "@/features/blog/blogThunks";
import ArticleHeader from "./components/ArticleHeader";
import ArticleBody from "./components/ArticleBody";
import LatestPosts from "./components/LatestPosts";

export default function MagazineDetail({ params }) {
  const { slug } = use(params);
  const dispatch = useDispatch();
  const { current: article, status } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [slug, dispatch]);

  if (status === "loading") return <p className="py-20 text-center">Loading...</p>;
  if (!article) return <p className="py-20 text-center">Article not found</p>;

  return (
    <article className="bg-white min-h-screen">
      <ArticleHeader data={article} />
      <ArticleBody 
        author={article.author} 
        publishedAt={article.publishedAt} 
        readTime={article.readTime} 
        excerpt={article.excerpt} 
      />
      <LatestPosts currentId={article.id} category={article.category.name} />
    </article>
  );
}