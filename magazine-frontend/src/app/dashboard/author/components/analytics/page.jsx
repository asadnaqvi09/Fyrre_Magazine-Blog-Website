"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorAnalytics } from "@/features/analytics/analyticsSlice";
import { fetchMyBlogs } from "@/features/blog/blogThunks";
import StatsGrid from "@/components/dashboard/author/analytics/StatsGrid";
import PerformanceCharts from "@/components/dashboard/author/analytics/PerformanceCharts";
import TopArticlesTable from "@/components/dashboard/author/analytics/TopArticlesTable";
import { Loader2 } from "lucide-react";

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const { authorData, loading: anaLoading } = useSelector((state) => state.analytics);
  const { items: myBlogs, loading: blogLoading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAuthorAnalytics());
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  const stats = React.useMemo(() => {
    const totalViews = authorData?.TotalViews || 0;
    const totalArticles = myBlogs?.length || 0;
    const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
    
    const now = new Date();
    const articlesThisMonth = myBlogs?.filter(blog => {
      const blogDate = new Date(blog.createdAt);
      return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
    }).length || 0;

    return {
      totalViews: totalViews.toLocaleString(),
      avgViews: avgViews.toLocaleString(),
      articlesThisMonth: articlesThisMonth.toString()
    };
  }, [authorData, myBlogs]);

  const topArticles = React.useMemo(() => {
    return [...(authorData?.perBlogAnalytics || [])]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(item => ({
        title: item.title,
        category: item.category || "General",
        views: item.views
      }));
  }, [authorData]);

  const chartData = React.useMemo(() => {
    return (authorData?.perBlogAnalytics || []).map((item, index) => ({
      name: `P${index + 1}`,
      month: item.title.substring(0, 10) + "...",
      views: item.views
    }));
  }, [authorData]);

  if (anaLoading || blogLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-zinc-300" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#fafafa] min-h-screen space-y-8">
      <StatsGrid stats={stats} />
      <PerformanceCharts lineData={chartData} barData={chartData} />
      <TopArticlesTable articles={topArticles} />
    </div>
  );
}