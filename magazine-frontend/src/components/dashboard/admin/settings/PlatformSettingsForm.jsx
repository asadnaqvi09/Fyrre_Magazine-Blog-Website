"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSettings, resetSettingStatus } from "@/features/setting/settingSlice";

export default function PlatformSettings() {
  const dispatch = useDispatch();
  const { settings, loading, error, success } = useSelector((state) => state.setting);

  const [formData, setFormData] = useState({
    siteTitle: "",
    siteDescription: "",
  });

  // Backend se data aane par local state update karna
  useEffect(() => {
    if (settings) {
      setFormData({
        siteTitle: settings.siteTitle || "",
        siteDescription: settings.siteDescription || "",
      });
    }
  }, [settings]);

  // Success message handle karna
  useEffect(() => {
    if (success) {
      alert("Settings updated successfully!");
      dispatch(resetSettingStatus());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (settings?._id) {
      dispatch(saveSettings({ 
        settingId: settings._id, 
        data: formData 
      }));
    }
  };

  return (
    <div className="bg-white p-10 border border-gray-100 max-w-4xl shadow-sm">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Platform Settings</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Site Title</label>
          <input 
            type="text" 
            name="siteTitle"
            value={formData.siteTitle}
            onChange={handleChange}
            placeholder="The Editorial"
            className="w-full bg-gray-50 border border-gray-200 p-4 text-gray-700 outline-none focus:bg-white focus:border-black transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Site Description</label>
          <textarea 
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            rows={4}
            placeholder="A modern magazine-style blogging platform..."
            className="w-full bg-gray-50 border border-gray-200 p-4 text-gray-700 outline-none focus:bg-white focus:border-black transition-all resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Admin/Contact Email</label>
          <input 
            type="email" 
            disabled
            value={settings?.siteEmail?.email || "Admin linked via ID"} 
            className="w-full bg-gray-100 border border-gray-200 p-4 text-gray-400 cursor-not-allowed italic"
          />
          <p className="text-[10px] text-gray-400 font-medium italic">* Email is automatically linked to the active Admin account.</p>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}