"use client"

import { signIn, signOut } from "next-auth/react"
import Button from "@/components/ui/Button";

type AuthProps = {
  isLoggedIn: boolean;
};

export function AuthButton({ isLoggedIn }: AuthProps) {
  return (<>
    {isLoggedIn ? (
      <Button
        className='text-pixel text-sm'
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    ) : (
      <Button
        className='text-pixel text-sm'
        onClick={() => signIn("google")}
      >
        Sign in
      </Button>
    )}
  </>)
}