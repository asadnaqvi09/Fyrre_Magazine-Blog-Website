"use client"
import React from 'react';
import Image from 'next/image';
import HeroImage from '../../../public/images/HeroImg.png';

export default function About() {
  const tickerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit +++ ";

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <h1 className="md:text-[16vw] px-10 leading-none tracking-tighter uppercase font-black">
          Art & Life
        </h1>
      </div>

      <div className="bg-black text-white py-3 mt-8 overflow-hidden whitespace-nowrap flex items-center">
        <div className="px-6 font-bold uppercase text-sm border-r border-white/30 z-10 bg-black">
          News Ticker+++
        </div>
        <div className="flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="px-4 text-sm font-light opacity-80">
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      <div className="px-10 mt-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <h2 className="text-6xl font-black uppercase leading-[0.9] max-w-xl">
            Do not Close Your Eyes
          </h2>
          
          <div className="max-w-md">
            <p className="text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu 
              dui vivamus arcu felis bibendum ut. Porttitor leo a diam.
            </p>
            
            <div className="flex flex-wrap items-center justify-between text-[10px] uppercase font-bold tracking-widest border-t border-black pt-4">
              <div><span className="font-normal opacity-60">Text</span> Jakob Gronberg</div>
              <div><span className="font-normal opacity-60">Date</span> 16. March 2022</div>
              <div><span className="font-normal opacity-60">Duration</span> 1 Min</div>
              <div className="border border-black rounded-full px-3 py-1 text-[8px]">Label</div>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9]">
          <Image 
            src={HeroImage} 
            fill 
            className="object-cover" 
            alt="Feature Art" 
            priority
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}