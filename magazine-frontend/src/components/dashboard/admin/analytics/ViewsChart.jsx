"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function PlatformViews({ viewerSplit, totalViews }) {
  const COLORS = ["#7c2d12", "#1e293b"];

  return (
    <div className="bg-white p-8 border border-gray-100 h-[450px]">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Platform Traffic</h2>
          <p className="text-gray-500 text-sm">User vs Guest engagement</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-slate-900">{totalViews.toLocaleString()}</p>
          <p className="text-xs uppercase font-bold text-gray-400">Total Views</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="70%">
        <BarChart data={viewerSplit}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="_id" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: '#f8fafc'}} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={60}>
            {viewerSplit.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}