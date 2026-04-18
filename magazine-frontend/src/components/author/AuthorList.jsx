"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '@/features/user/userSlice';

export default function AuthorList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAuthors());
  }, [loading, dispatch]);

  if (loading === "loading") return <p className="py-20 text-center">Loading authors...</p>;
  if (users.role !== "Author" ) return <p className="py-20 text-center">No authors found</p>;

  return (
    <section className="bg-white">
      <div className="flex flex-col px-6">
        {authors.map((author) => (
          <div
            key={author.username}
            className="flex items-center justify-between p-10 border-b border-black group hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-8">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={author.img}
                  alt={author.name}
                  fill
                  className="object-cover rounded-full grayscale"
                />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{author.name}</h3>
            </div>

            <div className="flex items-center gap-24">
              <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest">
                <span className="opacity-50 font-medium">Job</span>
                <span>{author.job || "–"}</span>
              </div>

              <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest">
                <span className="opacity-50 font-medium">City</span>
                <span>{author.city || "–"}</span>
              </div>

              <Link
                href={`/authors/${author.username}`}
                className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest group-hover:underline"
              >
                About <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}