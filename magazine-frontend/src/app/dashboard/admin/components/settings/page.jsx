"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSettings } from "@/features/setting/settingSlice";
import PlatformSettings from "@/components/dashboard/admin/settings/PlatformSettingsForm";

export default function SettingsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
       <PlatformSettings />
    </div>
  );
}