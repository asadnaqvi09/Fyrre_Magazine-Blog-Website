import React from "react";
import { Upload } from "lucide-react";

export default function ProfileSection({ data, onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange("profileImage", file);
    }
  };

  // Logic to show current URL or local preview
  const previewSrc = data.profileImage instanceof File 
    ? URL.createObjectURL(data.profileImage) 
    : data.profileImage || "/api/placeholder/80/80";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Profile Identity</label>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
            <img src={previewSrc} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange} 
              accept="image/*"
            />
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Upload New
            </div>
          </div>
          <span className="text-[10px] text-gray-400 uppercase hidden md:block">Max 2MB (JPG/PNG)</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500">Full Name</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-100 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-xs font-bold text-zinc-500">Short Biography</label>
          <span className="text-[10px] text-gray-400">{data.bio?.length || 0}/200</span>
        </div>
        <textarea
          value={data.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          maxLength={200}
          rows={4}
          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-100 outline-none resize-none transition-all leading-relaxed text-sm"
        />
      </div>
    </div>
  );
}