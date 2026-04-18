"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  const categories = ["Art", "Design", "Architecture"];
  const navigateToCategory = (category) => {
    router.push(`/blogs?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-black text-white">
      <div className="overflow-hidden whitespace-nowrap py-3 border-b border-white/20">
        <div className="flex animate-marquee">
          {[...Array(30)].map((_, i) => (
            <span key={i} className="px-4 text-[10px] font-bold uppercase tracking-widest">
              Newsletter+++
            </span>
          ))}
        </div>
      </div>

      <div className="px-10 py-20 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-black uppercase text-xl mb-8">Fyrre Magazine</h3>
        </div>

        <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigateToCategory(cat)}
              className="hover:opacity-60 text-left cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
          <Link href="/blogs" className="hover:opacity-60">Magazine</Link>
          <Link href="/authors" className="hover:opacity-60">Authors</Link>
        </div>

        <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
          <Link href="#" className="hover:opacity-60">Styleguide</Link>
          <Link href="#" className="hover:opacity-60">Licensing</Link>
          <Link href="#" className="hover:opacity-60">Changelog</Link>
        </div>
      </div>

      <div className="px-10 py-8 flex flex-col md:flex-row justify-between items-center border-t border-white/10 text-[10px] opacity-60 uppercase tracking-widest">
        <p>© Made by Asad Abbas - Powered by Treo-Studios</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Instagram size={14} className="cursor-pointer hover:opacity-100" />
          <Twitter size={14} className="cursor-pointer hover:opacity-100" />
          <Youtube size={14} className="cursor-pointer hover:opacity-100" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </footer>
  );
}