import React from "react";

const StatCard = ({ title, value, label }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <p className="text-sm text-gray-400 font-medium">{title}</p>
    <h2 className="text-4xl font-semibold mt-2 text-zinc-900">{value}</h2>
    <p className="text-xs mt-2 font-medium text-gray-400">{label}</p>
  </div>
);

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Views" value={stats.totalViews} label="Lifetime performance" />
      <StatCard title="Avg. Views" value={stats.avgViews} label="Per published article" />
      <StatCard title="Recent Activity" value={stats.articlesThisMonth} label="Articles this month" />
    </div>
  );
}