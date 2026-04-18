"use client";
import StatCard from "../../common/StatCard";
import { Newspaper, Clock, Users, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchAuthors, fetchAdminBlogs } from "@/features/user/userSlice";

export default function AdminStats() {
  const dispatch = useDispatch();

  const {
    users: authors = [],
    adminBlogs = [],
    loading: isLoading,
    error,
  } = useSelector((state) => state.user);

  const stats = useMemo(() => {
    const published = adminBlogs.filter(
      (blog) => blog.status?.toLowerCase() === "published" || blog.status?.toLowerCase() === "approved"
    );

    const pending = adminBlogs.filter(
      (blog) => blog.status?.toLowerCase() === "pending" || blog.status?.toLowerCase() === "under review"
    );

    return {
      totalPublished: published.length,
      pendingApprovals: pending.length,
      activeAuthors: authors.length,
      pendingMeta:
        pending.length === 0
          ? "All caught up!"
          : pending.length === 1
            ? "1 blog needs review"
            : `${pending.length} blogs need review`,
    };
  }, [adminBlogs, authors.length]);

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(fetchAuthors());
    }
    if (adminBlogs.length === 0) {
      dispatch(fetchAdminBlogs({}));
    }
  }, [dispatch, authors.length, adminBlogs.length]);

  if (error) {
    return (
      <div className="text-red-600 p-6 bg-red-50 rounded-xl">
        Failed to load dashboard stats: {error}
      </div>
    );
  }

  if (isLoading && adminBlogs.length === 0 && authors.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          label="Total Articles"
          value={isLoading ? "…" : stats.totalPublished}
          icon={<Newspaper size={32} strokeWidth={1} />}
        />

        <StatCard
          label="Pending Approvals"
          value={isLoading ? "…" : stats.pendingApprovals}
          meta={stats.pendingMeta}
          icon={<Clock size={32} strokeWidth={1} />}
        />

        <StatCard
          label="Active Authors"
          value={isLoading ? "…" : stats.activeAuthors}
          icon={<Users size={32} strokeWidth={1} />}
        />

        <StatCard
          label="Monthly Views"
          value={isLoading ? "…" : "10,811"}
          meta="+12% from last month"
          icon={<Eye size={32} strokeWidth={1} />}
        />
      </div>
    </section>
  );
}