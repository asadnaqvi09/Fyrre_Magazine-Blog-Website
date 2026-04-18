import React from "react";

export default function RejectedHeader({ count }) {
  return (
    <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-[#9B2C2C]">Rejected Blogs</h1>
        <p className="text-[#C53030] mt-1 text-sm font-medium">
          Review the feedback and resubmit your blogs
        </p>
      </div>
      <div className="text-5xl font-light text-[#9B2C2C]">
        {count}
      </div>
    </div>
  );
}