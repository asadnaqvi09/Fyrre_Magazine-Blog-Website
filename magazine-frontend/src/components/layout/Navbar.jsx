"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/auth/authThunks";
import { useRouter } from "next/navigation";
import { LogOut, CircleGauge } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const NavLinks = [
    { name: "Magazine", to: "/blogs" },
    { name: "Authors", to: "/authors" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    router.push("/auth/login");
  };

  const dashboardLink = user?.role === "Admin" ? "/dashboard/admin" : user?.role === "Author" ? "/dashboard/author" : null;

  return (
    <nav className="relative flex justify-between items-center px-8 py-6 border-b border-black bg-white z-50">
      <div>
        <Link href="/">
          <span className="text-xl font-black tracking-tighter uppercase">FYRRE MAGAZINE</span>
        </Link>
      </div>

      <div className="flex items-center gap-8 font-bold uppercase text-[12px] tracking-widest">
        <div className="hidden md:flex gap-8 items-center">
          {NavLinks.map((link, i) => (
            <Link key={i} href={link.to} className="hover:opacity-50 transition-opacity">{link.name}</Link>
          ))}
        </div>

        <span className="h-4 w-[1px] bg-black opacity-20"></span>

        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link href="/auth/login" className="hover:opacity-50 transition-opacity">Login</Link> | 
            <Link href="/auth/register" className="hover:opacity-50 transition-opacity">Register</Link>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-[10px]">
                {user?.userName?.substring(0, 2).toUpperCase()}
              </div>
              <span className="hover:opacity-70">{user?.userName}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white border border-black shadow-xl py-2">
                {dashboardLink && (
                  <Link href={dashboardLink} onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-neutral-100 cursor-pointer flex gap-2 items-center">
                    <CircleGauge size={16} /> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-black hover:text-white transition-colors cursor-pointer flex gap-2 items-center">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}