"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { AnimatePresence } from "framer-motion";

export default function DashboardShell({ title, children, role = "Reader" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="flex h-screen bg-white text-slate-900 overflow-hidden relative">
      <AnimatePresence>
        {isOpen && isMobile && (
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} role={role} />
        )}
      </AnimatePresence>

      {!isMobile && (
        <Sidebar isOpen={true} setIsOpen={setIsOpen} role={role} />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar title={title} setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}