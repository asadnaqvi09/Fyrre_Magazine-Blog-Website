import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

export default function LatestPosts({ currentId, category }) {
  const { list: blogs } = useSelector(state => state.blogs);

  const relatedPosts = blogs.filter(post => post.category.name === category && post.id !== currentId).slice(0, 6);

  return (
    <section className="px-10 py-20 border-t border-black">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-black uppercase">Latest Posts</h2>
        <Link href="/blogs" className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest group">
          Read All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-black">
        {relatedPosts.map(post => (
          <div key={post.id} className="p-8 border-r border-b border-black group hover:bg-zinc-50">
            <div className="relative aspect-square mb-6 overflow-hidden">
              <Image 
                src={post.blogImg} 
                alt={post.title} 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all" 
              />
            </div>
            <Link href={`/blogs/${post.slug}`}>
              <h3 className="text-2xl font-bold mb-4 hover:underline">{post.title}</h3>
            </Link>
            <span className="text-[10px] border border-black px-3 py-1 rounded-full uppercase font-bold">{post.category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}