"use client";

export default function TopAuthors({ topAuthors, totalViews }) {
  return (
    <div className="bg-white p-8 border border-gray-100">
      <h3 className="text-xl font-serif font-bold mb-6">Top Contributors</h3>
      <div className="space-y-8">
        {topAuthors.map((author) => (
          <div key={author._id} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-sm rounded-full">
              ID
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900">Author: {author._id}</h4>
              <p className="text-xs text-gray-500">{author.views} Cumulative Views</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600">
                {((author.views / totalViews) * 100).toFixed(1)}% Impact
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}