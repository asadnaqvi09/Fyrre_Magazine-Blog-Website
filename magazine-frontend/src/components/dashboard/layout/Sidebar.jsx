"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  LayoutDashboard, FileText, Users, Tag, 
  BarChart3, Settings, HomeIcon, X, ChevronDown 
} from "lucide-react";

const MENU_CONFIG = {
  Admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Blogs", href: "/dashboard/admin/components/blogs", icon: FileText },
    { label: "Users", href: "/dashboard/admin/components/users", icon: Users },
    { label: "Categories", href: "/dashboard/admin/components/categories", icon: Tag },
    { label: "Analytics", href: "/dashboard/admin/components/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/admin/components/settings", icon: Settings }
  ],
  Author: [
    { label: "Dashboard", href: "/dashboard/author", icon: LayoutDashboard },
    { 
      label: "Blogs", 
      icon: FileText,
      isDropdown: true,
      subLinks: [
        { label: "View All", href: "/dashboard/author/components/blogs/my_blogs" },
        { label: "Create New", href: "/dashboard/author/components/blogs/create_blog" },
        { label: "Drafts", href: "/dashboard/author/components/blogs/draft_blogs" },
        { label: "Rejected", href: "/dashboard/author/components/blogs/rejected_blogs" },
      ]
    },
    { label: "Analytics", href: "/dashboard/author/components/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/author/components/settings", icon: Settings }
  ]
};

export default function Sidebar({ isOpen, setIsOpen, role }) {
  const pathname = usePathname();
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // Debugging line - check your browser console
  console.log("Sidebar Active Role:", role);

  const links = MENU_CONFIG[role] || [];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col h-full shrink-0 z-50 lg:translate-x-0"
      >
        <div className="px-8 py-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-medium text-slate-900">Fyrre Magazine</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">
              {role || "No Role Detected"}
            </p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto no-scrollbar">
          {links.length > 0 ? (
            links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.isDropdown) {
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => setIsBlogOpen(!isBlogOpen)}
                      className="flex items-center justify-between px-8 py-4 text-slate-500 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${isBlogOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isBlogOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50/50"
                        >
                          {item.subLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={`block pl-16 py-3 text-sm transition-colors ${
                                pathname === sub.href ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative flex items-center gap-3 px-8 py-4 transition-all group ${
                    isActive ? "text-slate-900 bg-slate-50/50" : "text-slate-500 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-slate-900 rounded-r-full" 
                    />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="px-8 py-4 text-xs text-red-400 italic">
              Menu not found for role: {role}
            </div>
          )}
        </nav>

        <div className="p-8 border-t border-gray-100 bg-white space-y-4">
          <Link href="/" className="flex items-center text-slate-500 text-sm hover:text-slate-900 transition-colors">
            <HomeIcon className="mr-2" size={14} /> Back To Home
          </Link>
          <p className="text-slate-400 text-[10px]">© {new Date().getFullYear()} Fyrre Editorial</p>
        </div>
      </motion.aside>
    </>
  );
}