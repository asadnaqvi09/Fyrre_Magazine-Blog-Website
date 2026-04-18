"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { refreshToken } from "@/features/auth/authThunks";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!token) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch {
          router.replace("/auth/login");
          return;
        }
      }
      setLoading(false);
    };
    init();
  }, [token, dispatch, router]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) router.replace("/auth/login");
      else if (user?.role !== "Admin") router.replace("/");
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== "Admin") return null;

  return <DashboardShell role="Admin" title="Admin Dashboard">{children}</DashboardShell>;
}