"use client";

import { useSession, signOut } from "next-auth/react";

export default function SignOut() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-black text-white w-screen flex justify-end px-10 h-[70px] items-center">
        <button
          className="px-6 py-2 bg-[#5f0b0b] rounded"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}
