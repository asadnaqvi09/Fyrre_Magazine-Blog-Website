"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Instagram, Twitter, Youtube, ArrowLeft } from 'lucide-react';
import { getAuthorProfile } from '@/features/user/userSlice';
import { fetchMyBlogs } from '@/features/blog/blogThunks';

export default function AuthorProfile({ params }) {
  const { username } = params;
  const dispatch = useDispatch();

  const { list: authors, status: authorStatus } = useSelector(state => state.user);
  const { list: blogs, status: blogStatus } = useSelector(state => state.blog);

  useEffect(() => {
    if (authorStatus === 'idle') dispatch(getAuthorProfile());
    if (blogStatus === 'idle') dispatch(fetchMyBlogs());
  }, [authorStatus, blogStatus, dispatch]);

  if (authorStatus === 'loading' || blogStatus === 'loading') {
    return <div className="text-center py-20">Loading...</div>;
  }

  const author = authors.find(a => a.username === username);
  if (!author) return <div className="text-center py-20">Author not found</div>;

  const articles = blogs.filter(blog => blog.author.username === username);

  return (
    <section className="bg-white min-h-screen">
      <div className="flex justify-between items-center px-10 py-6 border-b border-black">
        <Link href="/authors" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
          <ArrowLeft size={14} /> Go Back
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Author</span>
      </div>

      <div className="px-10 py-20 flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-64 h-64 mb-8">
            <Image 
              src={author.img} 
              alt={author.name} 
              fill 
              className="object-fit grayscale" 
            />
          </div>
          <div className="w-64 border-t border-black pt-4 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest">Follow</span>
            <div className="flex gap-4">
              <Instagram size={14} className="cursor-pointer hover:opacity-60" />
              <Twitter size={14} className="cursor-pointer hover:opacity-60" />
              <Youtube size={14} className="cursor-pointer hover:opacity-60" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-5xl uppercase mb-10">
            {author.name.split(' ')[0]}<br />{author.name.split(' ')[1] || ""}
          </h1>
          <p className="text-lg font-bold leading-relaxed mb-10 max-w-xl">
            {author?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
        </div>
      </div>

      {/* Articles List Section */}
      <div className="border-t border-black mt-20">
        <div className="px-10 py-12">
          <h2 className="text-5xl font-black uppercase mb-12">Articles by {author.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black">
            {articles.map((art) => (
              <div key={art.id} className="flex gap-6 p-8 border-r border-b border-black group hover:bg-zinc-50 transition-colors">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image src={art.blogImg} alt={art.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2">{art.title}</h3>
                  <div className="flex gap-4 text-[10px] uppercase font-bold tracking-widest">
                    <p><span className="font-normal opacity-50 mr-1">Date</span> {art.publishedAt}</p>
                    <p><span className="font-normal opacity-50 mr-1">Read</span> {art.readTime}</p>
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