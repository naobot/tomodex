"use client";

import { useToast } from "./ToastContext";

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: "fixed",
        bottom: "var(--primitive-space-6)",
        right: "var(--primitive-space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--primitive-space-2)",
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--primitive-space-3)",
            padding: "var(--primitive-space-3) var(--primitive-space-4)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--primitive-radius-md)",
            boxShadow: "var(--shadow-md)",
            maxWidth: "360px",
          }}
        >
          <p
            style={{
              flex: 1,
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
            }}
          >
            {toast.message}
          </p>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            style={{
              flexShrink: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "var(--color-text-muted)",
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}