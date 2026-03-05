"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import styles from "./HomeCard.module.css";

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
const ITEM_DELAYS = ["0.08s", "0.14s", "0.20s"];

export default function HomeCard({ isLoggedIn }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.wordmark}>Tomodex</h1>
        <p className={styles.tagline}>Your personal rolodex</p>
        <hr className={styles.divider} />

        <ul className={styles.actionList}>
          {actions.map((action, i) => {
            const inner = (
              <>
                <span>
                  <span className={styles.actionLabel}>{action.label}</span>
                  <br />
                  <span className={styles.actionSub}>{action.sub}</span>
                </span>
                <span className={styles.actionArrow}>→</span>
              </>
            );

            if (!isLoggedIn || !action.href) {
              return (
                <li key={action.key}>
                  <button
                    className={styles.actionBtn}
                    style={{ animationDelay: ITEM_DELAYS[i] }}
                    disabled={!isLoggedIn}
                  >
                    {inner}
                  </button>
                </li>
              );
            }

            return (
              <li key={action.key}>
                <Link
                  href={action.href}
                  className={styles.actionBtn}
                  style={{ animationDelay: ITEM_DELAYS[i] }}
                >
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>

        {isLoggedIn ? (
          <button
            className={styles.authBtn}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <button
            className={styles.authBtn}
            onClick={() => signIn("google")}
          >
            Sign in to get started
          </button>
        )}
      </div>
    </div>
  );
}