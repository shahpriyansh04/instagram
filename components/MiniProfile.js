import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
function MiniProfile() {
  const user = useUser();
  const { signOut } = useClerk();
  return (
    <div className="flex items-center mt-14 justify-between ml-10">
      <img
        src={user.profileImageUrl}
        className="rounded-full border p-[2px] w-16 h-16"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
