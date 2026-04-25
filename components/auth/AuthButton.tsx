"use client";
import { signIn, signOut } from "next-auth/react";

type AuthProps = {
  isLoggedIn: boolean;
};

export function AuthButton({ isLoggedIn }: AuthProps) {
  return isLoggedIn ? (
    <button
      className="btn"
      style={{ padding: "2px 8px", fontSize: 9 }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  ) : (
    <button
      className="btn"
      style={{ padding: "2px 8px", fontSize: 9 }}
      onClick={() => signIn("google")}
    >
      Sign In
    </button>
  );
}