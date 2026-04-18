import React from "react";

export default function TopArticlesTable({ articles }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50">
        <h3 className="text-lg font-medium">Top Performing Articles</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm bg-gray-50/50">
            <th className="px-8 py-4 font-normal">Rank</th>
            <th className="px-8 py-4 font-normal">Title</th>
            <th className="px-8 py-4 font-normal">Category</th>
            <th className="px-8 py-4 font-normal text-right">Views</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {articles.map((article, index) => (
            <tr key={index} className="hover:bg-gray-50/30 transition-colors">
              <td className="px-8 py-5">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-xs font-medium">
                  {index + 1}
                </span>
              </td>
              <td className="px-8 py-5 text-sm font-medium text-zinc-800">{article.title}</td>
              <td className="px-8 py-5">
                <span className="px-3 py-1 border border-gray-100 text-[10px] rounded-full text-gray-500 uppercase font-semibold">
                  {article.category}
                </span>
              </td>
              <td className="px-8 py-5 text-right text-sm font-medium text-zinc-600">
                {article.views.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}