"use client";

export default function TopArticles({ topBlogs }) {
  return (
    <div className="bg-white p-8 border border-gray-100">
      <h3 className="text-xl font-serif font-bold mb-6">Top Performing Content</h3>
      <div className="space-y-6">
        {topBlogs.map((item, i) => (
          <div key={item._id} className="flex justify-between items-center group">
            <div className="max-w-[70%]">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Rank #{i + 1}</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                {/* Note: Backend sends Blog ID in _id, you might need to populate 'title' in service */}
                Article ID: {item._id} 
              </h4>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-gray-900">{item.views.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Total Views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}