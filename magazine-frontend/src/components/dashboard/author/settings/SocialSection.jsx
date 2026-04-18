import React from "react";
import { Twitter, Instagram, Linkedin, Globe } from "lucide-react";

export default function SocialSection({ links, onChange }) {
  const socialInputs = [
    { id: "twitter", icon: <Twitter size={18} />, prefix: "twitter.com/", key: "twitter" },
    { id: "instagram", icon: <Instagram size={18} />, prefix: "instagram.com/", key: "instagram" },
    { id: "linkedin", icon: <Linkedin size={18} />, prefix: "linkedin.com/in/", key: "linkedin" },
    { id: "website", icon: <Globe size={18} />, prefix: "https://", key: "website" },
  ];

  return (
    <div className="space-y-6 pt-10 border-t border-gray-50">
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Social Connections</label>
      <div className="grid grid-cols-1 gap-4">
        {socialInputs.map((input) => (
          <div key={input.id} className="group flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-zinc-400 group-focus-within:text-zinc-900 group-focus-within:bg-zinc-100 transition-all">
              {input.icon}
            </div>
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-zinc-100 focus-within:bg-white transition-all">
              <span className="text-zinc-300 text-xs font-mono mr-1">{input.prefix}</span>
              <input
                type="text"
                value={links[input.key] || ""}
                onChange={(e) => onChange(input.key, e.target.value)}
                className="w-full py-4 bg-transparent border-none outline-none text-sm text-zinc-800"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
        <p className="text-[10px] leading-relaxed text-zinc-400 uppercase font-medium">
          Note: These links will be visible on your public author page to help readers connect with your work across platforms.
        </p>
      </div>
    </div>
  );
}