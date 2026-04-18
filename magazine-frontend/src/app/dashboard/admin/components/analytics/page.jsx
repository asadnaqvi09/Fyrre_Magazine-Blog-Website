"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAnalytics } from "@/features/analytics/analyticsSlice";
import PlatformViews from "@/components/dashboard/admin/analytics/ViewsChart";
import TopArticles from "@/components/dashboard/admin/analytics/TopArticlesTable";
import TopAuthors from "@/components/dashboard/admin/analytics/TopAuthorsChart";

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const { adminData, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getAdminAnalytics());
  }, [dispatch]);

  if (loading) return <div className="p-10 text-gray-400 animate-pulse">Fetching Real-time Analytics...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PlatformViews viewerSplit={adminData.viewerSplit} totalViews={adminData.totalViews} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TopArticles topBlogs={adminData.topBlogs} />
        <TopAuthors topAuthors={adminData.topAuthors} totalViews={adminData.totalViews} />
      </div>
    </div>
  );
}