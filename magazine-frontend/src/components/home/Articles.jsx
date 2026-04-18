"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import articlesData from "@/lib/mock_data/blogs.json";
import Mag_Cover from "../../../public/images/magazin-cover.png";

export default function Articles() {
  const mainArticles = [...articlesData]
    .sort((a, b) => b.views + b.likes - (a.views + a.likes))
    .slice(0, 5);

  const popularArticles = [...articlesData]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <section className="flex flex-col lg:flex-row gap-16 px-10 py-12 bg-white">
      <div className="flex-1 flex flex-col gap-12">
        <div className="flex flex-col gap-12">
          {mainArticles.map((blog) => (
            <div key={blog.id} className="flex gap-6 pb-12 border-b border-black/10">
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image
                  src={blog.blogImg}
                  alt={blog.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition"
                />
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <Link href={`/blogs/${blog.slug}`} className="block">
                    <h3 className="font-bold text-2xl leading-tight mb-4">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2 max-w-lg">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-wider pt-4">
                  <p>
                    <span className="font-normal opacity-60 mr-1">Text</span>
                    {blog.author.name}
                  </p>
                  <p>
                    <span className="font-normal opacity-60 mr-1">Date</span>
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-normal opacity-60 mr-1">Read</span>
                    {blog.readTime}
                  </p>
                  <span className="ml-auto border border-black rounded-full px-3 py-1 text-[8px] uppercase">
                    {blog.category.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/blogs" className="group flex items-center gap-2 w-fit pt-4">
          <span className="text-sm font-bold tracking-widest">
            All Articles
          </span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1">
            Print Magazine
          </p>
          <h2 className="text-4xl font-black mb-6">03/2022</h2>

          <div className="relative aspect-[3/4] bg-black">
            <Image
              src={Mag_Cover}
              alt="Magazine Cover"
              fill
              className="object-cover grayscale hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 bg-orange-900/40" />
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-4 mb-6">
            Most Popular
          </h4>

          <div className="flex flex-col gap-8">
            {popularArticles.map((art, index) => (
              <div key={art.id} className="pb-6 border-b border-black/10">
                <div className="flex gap-8">
                  <span className="text-lg font-black text-zinc-300">
                    0{index + 1}
                  </span>

                  <div>
                    <h5 className="font-bold text-base leading-tight mb-1">
                      {art.title}
                    </h5>
                    <p className="text-[10px] uppercase font-bold">
                      <span className="font-normal opacity-60">Text</span>{" "}
                      {art.author.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}