"use client";
import StatCard from "../../common/StatCard";
import { Newspaper, Clock, Eye, BarChart3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthorAnalytics } from "@/features/analytics/analyticsSlice";
import { fetchMyBlogs } from "@/features/blog/blogThunks";

export default function AuthorStats() {
  const dispatch = useDispatch();
  const { authorData, loading: anaLoading } = useSelector((state) => state.analytics);
  const { items: myBlogs, loading: blogLoading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAuthorAnalytics());
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  const isLoading = anaLoading || blogLoading;

  // Logic to calculate pending vs published from myBlogs
  const publishedCount = myBlogs.filter(b => b.status === "Published").length;
  const pendingCount = myBlogs.filter(b => b.status === "Pending").length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        label="Total Articles"
        value={isLoading ? "..." : myBlogs.length}
        icon={<Newspaper size={32} strokeWidth={1} />}
      />

      <StatCard
        label="Pending Reviews"
        value={isLoading ? "..." : pendingCount}
        meta={pendingCount > 0 ? `${pendingCount} awaiting approval` : "All caught up!"}
        icon={<Clock size={32} strokeWidth={1} />}
      />

      <StatCard
        label="Published"
        value={isLoading ? "..." : publishedCount}
        icon={<BarChart3 size={32} strokeWidth={1} />}
      />

      <StatCard
        label="Total Views"
        value={isLoading ? "..." : authorData?.TotalViews?.toLocaleString() || 0}
        meta="Lifetime performance"
        icon={<Eye size={32} strokeWidth={1} />}
      />
    </section>
  );
}