"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/features/user/userSlice"; 
import ProfileSection from "@/components/dashboard/author/settings/ProfileSection";
import SocialSection from "@/components/dashboard/author/settings/SocialSection";
import { Loader2, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, success } = useSelector((state) => state.user);

  const [settings, setSettings] = useState({
    fullName: "",
    bio: "",
    profileImage: "",
    social: {
      twitter: "",
      instagram: "",
      linkedin: "",
      website: ""
    }
  });

  useEffect(() => {
    if (user) {
      setSettings({
        fullName: user.fullName || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
        social: {
          twitter: user.social?.twitter || "",
          instagram: user.social?.instagram || "",
          linkedin: user.social?.linkedin || "",
          website: user.social?.website || ""
        }
      });
    }
  }, [user]);

  const handleProfileChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSocialChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      social: { ...prev.social, [key]: value }
    }));
  };

  const handleSave = () => {
    // Preparing FormData for potential image upload
    const formData = new FormData();
    formData.append("fullName", settings.fullName);
    formData.append("bio", settings.bio);
    formData.append("social", JSON.stringify(settings.social));
    
    if (settings.profileImage instanceof File) {
      formData.append("profileImage", settings.profileImage);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-zinc-900">Account Settings</h1>
        <p className="text-sm text-gray-500">Manage your public profile and social presence</p>
      </div>

      <div className="space-y-10">
        <ProfileSection data={settings} onChange={handleProfileChange} />
        <SocialSection links={settings.social} onChange={handleSocialChange} />
        
        <div className="pt-6">
          <button 
            disabled={loading}
            onClick={handleSave}
            className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-black transition-all flex items-center justify-center gap-2 disabled:bg-zinc-400"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : success ? <CheckCircle size={18} /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}