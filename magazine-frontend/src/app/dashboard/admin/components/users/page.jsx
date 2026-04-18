"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  promoteToAuthor,
  revokeAuthor,
  deleteUser,
} from "@/features/user/userSlice";
import UsersCard from "@/components/dashboard/admin/users/UsersCard";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handlePromote = (userId) => dispatch(promoteToAuthor(userId));
  const handleRevoke = (userId) => dispatch(revokeAuthor(userId));
  const handleDelete = (userId) => {
    if (confirm("Delete this user permanently? This cannot be undone.")) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-serif text-xl">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center font-serif text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="py-20 text-center font-serif text-xl text-gray-500">
        No users found
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {users.map((user) => (
        <UsersCard
          key={user._id}
          user={user}
          articleCount={0}
          onPromote={() => handlePromote(user._id)}
          onRevoke={() => handleRevoke(user._id)}
          onDelete={() => handleDelete(user._id)}
        />
      ))}
    </section>
  );
}