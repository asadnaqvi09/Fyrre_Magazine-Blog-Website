"use client";
import { Mail, FileText, Calendar, Trash2 } from "lucide-react";

export default function UsersCard({
  user,
  articleCount = 0,
  onPromote,
  onRevoke,
  onDelete,
}) {
  const initials =
    user.userName
      ?.split(" ")
      .map((w) => w[0]?.toUpperCase() || "")
      .join("") || "U";

  const isAuthor = user.role === "Author";
  const isAdmin = user.role === "Admin";

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="bg-white border border-gray-100 p-6 relative flex flex-col group">
      <span
        className={`absolute top-6 right-6 text-[10px] font-bold px-3 py-1 border uppercase ${
          isAuthor
            ? "bg-purple-50 text-purple-600 border-purple-100"
            : "bg-gray-50 text-gray-600 border-gray-100"
        }`}
      >
        {user.role || "Reader"}
      </span>

      <div className="w-20 h-20 rounded-full bg-gray-50 border flex items-center justify-center mb-6">
        <span className="text-xl font-medium text-gray-500">{initials}</span>
      </div>

      <h3 className="text-2xl font-serif font-bold mb-1 truncate">
        {user.userName || "Unnamed"}
      </h3>

      <p className="text-sm text-gray-400 mb-6 italic">
        Status: {user.isVerified ? "Verified" : "Unverified"}
      </p>

      <div className="space-y-4 text-gray-500 mb-8">
        <div className="flex items-center gap-3">
          <Mail size={16} />
          <span className="text-sm truncate">{user.email || "No email"}</span>
        </div>
        <div className="flex items-center gap-3">
          <FileText size={16} />
          <span className="text-sm">{articleCount} articles linked</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={16} />
          <span className="text-sm">Joined {joinDate}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t flex gap-3">
        {!isAdmin && (
          <>
            <button
              onClick={isAuthor ? onRevoke : onPromote}
              className="flex-[2] border py-3 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-colors"
            >
              {isAuthor ? "Revoke Author" : "Promote to Author"}
            </button>

            <button
              onClick={onDelete}
              className="flex-1 border border-red-100 text-red-500 py-3 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}