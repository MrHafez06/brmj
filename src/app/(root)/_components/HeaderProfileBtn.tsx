"use client";

import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function HeaderProfileBtn() {
  return (
    <>
      <UserButton afterSignOutUrl="/" />

      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-3 py-1.5 rounded-lg bg-[#1a1a24] hover:bg-[#252532] border border-gray-800/30 transition-colors text-gray-300">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;
