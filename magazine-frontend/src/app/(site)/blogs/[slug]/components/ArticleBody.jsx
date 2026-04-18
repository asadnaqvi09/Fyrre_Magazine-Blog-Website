import Image from 'next/image';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function ArticleBody({ author, publishedAt, readTime, excerpt }) {
    return (
        <div className="px-10 py-20 flex flex-col md:flex-row gap-20 justify-center">
            <aside className="w-full md:w-1/4 pt-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                    <Image 
                        src={author.authorImg} 
                        alt={author.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full grayscale" 
                    />
                    <h4 className="font-bold uppercase text-sm">{author.name}</h4>
                </div>

                <div className="flex gap-4 justify-between text-[10px] uppercase font-bold tracking-widest opacity-60">
                    <p>Date: {publishedAt}</p>
                    <p>Read: {readTime}</p>
                </div>

                <div className="flex gap-4 mt-6">
                    <Twitter size={14} className="cursor-pointer" />
                    <Instagram size={14} className="cursor-pointer" />
                    <Facebook size={14} className="cursor-pointer" />
                </div>
            </aside>

            <main className="w-full md:w-2/4 text-lg leading-relaxed text-zinc-800 flex flex-col gap-8">
                <p className="mb-4 font-bold text-black">{excerpt}</p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
            </main>
        </div>
    );
}