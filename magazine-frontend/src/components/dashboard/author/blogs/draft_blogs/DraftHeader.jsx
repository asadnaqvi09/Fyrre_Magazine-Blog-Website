import React from "react";

export default function DraftHeader({ count }) {
  return (
    <div className="flex justify-between items-end border-b border-gray-100 pb-6">
      <div>
        <h1 className="text-5xl font-medium text-zinc-900">{count}</h1>
        <p className="text-gray-400 mt-1 text-lg">Draft Blogs</p>
      </div>
      <div className="text-gray-400 text-sm font-medium">
        Continue working on your drafts
      </div>
    </div>
  );
}