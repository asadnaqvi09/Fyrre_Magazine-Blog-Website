import Image from 'next/image';

export default function ArticleHeader({ data }) {
    return (
        <header className="px-10 pt-10">
            <div className="flex justify-between items-start mb-10 gap-10">
                <h1 className="text-5xl font-black uppercase tracking-tighter w-1/2">
                    {data.title}
                </h1>
                <div className="w-1/2 pt-4">
                    <p className="text-sm font-bold leading-relaxed">{data.excerpt}</p>
                    <div className="flex gap-6 mt-6 text-[10px] uppercase font-bold tracking-widest border-t border-black pt-4">
                        <p><span className="opacity-50 font-normal">Date</span> {data.date}</p>
                        <p><span className="opacity-50 font-normal">Read</span> {data.read}</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full aspect-[21/9] overflow-hidden">
                <Image src={data.blogImg} alt={data.title} fill className="object-fit grayscale" />
            </div>
        </header>
    );
}