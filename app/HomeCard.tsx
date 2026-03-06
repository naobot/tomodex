"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import styles from "./HomeCard.module.css";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type Props = {
  isLoggedIn: boolean;
};

const actions = [
  {
    key: "find",
    label: "Find Friend",
    sub: "Quick search",
    href: null, // interactive — handled separately
  },
  {
    key: "all",
    label: "All Friends",
    sub: "Browse everyone",
    href: "/people",
  },
  {
    key: "birthdays",
    label: "Birthdays",
    sub: "Upcoming & recent",
    href: "/birthdays",
  },
];

// Animation delays for staggered entrance — applied as inline style since
// CSS Modules can't target nth-child across a mapped list reliably
// const ITEM_DELAYS = ["0.08s", "0.14s", "0.20s"];

export default function HomeCard({ isLoggedIn }: Props) {
  return (
    <Card className="w-sm m-auto p-8px">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-sm uppercase text-pixel">Tomodex</h1>
        </div>
        <div>
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
        </div>
      </div>

        <ul className="my-4">
          {actions.map((action, i) => {
            const inner = (
              <>
                <span className='text-2xl'>{action.label}</span>
              </>
            );

            if (!isLoggedIn || !action.href) {
              return (
                <li key={action.key} className={`${isLoggedIn ? styles.BarMenuItem : 'text-disabled'} -my-2`}>
                  <button
                    disabled={!isLoggedIn}
                  >
                    {inner}
                  </button>
                </li>
              );
            }

            return (
              <li key={action.key} className={`${styles.BarMenuItem} -my-2`}>
                <Link
                  href={action.href}
                  // style={{ animationDelay: ITEM_DELAYS[i] }}
                >
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>
    </Card>
  );
}