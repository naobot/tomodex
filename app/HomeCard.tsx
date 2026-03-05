"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

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

export default function HomeCard({ isLoggedIn }: Props) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #f7f3ee;
          --ink: #1c1917;
          --ink-muted: #78716c;
          --ink-faint: #c4bdb6;
          --accent: #8b6f47;
          --accent-light: #e8ddd2;
          --card-bg: #fdfaf7;
        }

        body {
          background-color: var(--cream);
          margin: 0;
        }

        .home-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--cream);
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(139,111,71,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139,111,71,0.04) 0%, transparent 50%);
          padding: 2rem;
        }

        .home-card {
          background: var(--card-bg);
          border: 1px solid var(--accent-light);
          border-radius: 2px;
          padding: 3rem 3.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow:
            0 1px 2px rgba(28,25,23,0.04),
            0 8px 32px rgba(28,25,23,0.06),
            0 0 0 1px rgba(139,111,71,0.04);
          animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .home-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin: 0 0 0.25rem;
          line-height: 1;
        }

        .home-tagline {
          font-size: 0.8rem;
          font-weight: 300;
          color: var(--ink-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 2.5rem;
        }

        .home-divider {
          border: none;
          border-top: 1px solid var(--accent-light);
          margin: 0 0 2rem;
        }

        .action-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--accent-light);
          border-radius: 2px;
          background: transparent;
          color: var(--ink);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
          animation: itemIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .action-btn:nth-child(1) { animation-delay: 0.08s; }
        .action-btn:nth-child(2) { animation-delay: 0.14s; }
        .action-btn:nth-child(3) { animation-delay: 0.20s; }

        @keyframes itemIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .action-btn:not(:disabled):hover {
          background: var(--accent-light);
          border-color: var(--accent);
          transform: translateX(2px);
        }

        .action-btn:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }

        .action-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .action-sub {
          font-size: 0.72rem;
          font-weight: 300;
          color: var(--ink-muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .action-arrow {
          color: var(--ink-faint);
          font-size: 1rem;
          transition: color 0.15s;
        }

        .action-btn:not(:disabled):hover .action-arrow {
          color: var(--accent);
        }

        .login-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--ink);
          color: var(--cream);
          border: none;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          animation: itemIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }

        .login-btn:hover {
          background: var(--accent);
          transform: translateY(-1px);
        }

        .login-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="home-root">
        <div className="home-card">
          <h1 className="home-wordmark">Tomodex</h1>
          <p className="home-tagline">Your personal rolodex</p>
          <hr className="home-divider" />

          <ul className="action-list">
            {actions.map((action) => {
              const inner = (
                <>
                  <span>
                    <span className="action-label">{action.label}</span>
                    <br />
                    <span className="action-sub">{action.sub}</span>
                  </span>
                  <span className="action-arrow">→</span>
                </>
              );

              if (!isLoggedIn || !action.href) {
                return (
                  <li key={action.key}>
                    <button className="action-btn" disabled={!isLoggedIn}>
                      {inner}
                    </button>
                  </li>
                );
              }

              return (
                <li key={action.key}>
                  <Link href={action.href} className="action-btn">
                    {inner}
                  </Link>
                </li>
              );
            })}
          </ul>

          {isLoggedIn ? (
            <button
              className="login-btn"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => signIn("google")}
            >
              Sign in to get started
            </button>
          )}
        </div>
      </div>
    </>
  );
}