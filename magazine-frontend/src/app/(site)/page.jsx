import About from "@/components/home/About";
import Articles from "@/components/home/Articles";
import Authors from "@/components/home/Authors";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <main className="min-h-screen flex flex-col p-8">
      <About />
      <Articles />
      <Authors />
    </main>
    </>
  );
}