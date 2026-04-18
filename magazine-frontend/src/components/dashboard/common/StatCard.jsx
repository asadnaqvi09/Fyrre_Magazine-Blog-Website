"use client";
import { motion } from "framer-motion";

export default function StatCard({ label, value, meta, icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-100 px-6 py-10 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[200px]"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-gray-500 text-lg font-medium leading-tight max-w-[120px]">
          {label}
        </p>
        {icon && <div className="text-slate-300 group-hover:text-slate-900 transition-colors">{icon}</div>}
      </div>

      <div className="mt-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {value}
        </h3>
        {meta && (
          <p className="text-gray-400 text-sm font-normal">
            {meta}
          </p>
        )}
      </div>
    </motion.div>
  );
}