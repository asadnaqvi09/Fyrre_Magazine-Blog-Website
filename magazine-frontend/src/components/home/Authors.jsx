"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '@/features/user/userSlice';
import defautlAvatar from '@/../public/images/Author1.png'
export default function Authors() {
    const dispatch = useDispatch();
    const { users: authors, loading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    if (loading) return <p className="py-20 text-center">Loading authors...</p>;
    if (!authors || authors.length === 0) return <p className="py-20 text-center">No authors found</p>;

    return (
        <section className='px-10'>
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Authors</h2>
                <Link href="/authors" className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest pb-4 group">
                    All Authors <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black">
                {authors.map((author) => (
                    <div 
                        key={author._id} 
                        className="flex items-center gap-6 p-8 border-r border-b border-black hover:bg-zinc-50 transition-colors"
                    >
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <Image 
                                src={author.profileImage?.url || defautlAvatar} 
                                alt={author.userName} 
                                fill 
                                className="object-cover rounded-full grayscale"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1">{author.userName}</h3>
                            <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider">
                                <p>
                                    <span className="font-normal opacity-60 mr-1">Role</span> 
                                    {author.role}
                                </p>
                                <p>
                                    <span className="font-normal opacity-60 mr-1">Joined</span> 
                                    {new Date(author.createdAt).getFullYear()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}