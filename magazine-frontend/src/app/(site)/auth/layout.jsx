export default function AuthLayout({ children }) {
    return (
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            <div className="hidden md:flex flex-col justify-center gap-10 p-20 border-r border-black">
                <h1 className="text-6xl font-black uppercase tracking-tight">
                    Fyrre
                    <br />
                    Magazine
                </h1>
                <blockquote className="max-w-md text-xl font-black uppercase leading-tight">
                    “Great editorial design makes
                    <br />
                    reading feel intentional.”
                </blockquote>
            </div>

            <div className="flex items-center justify-center px-6">
                {children}
            </div>
        </section>
    )
}