"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Toast = {
  id: string;
  message: string;
};

type ToastState = {
  toasts: Toast[];
};

type ToastAction =
  | { type: "ADD"; toast: Toast }
  | { type: "DISMISS"; id: string };

type ToastContextValue = {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  dismissToast: (id: string) => void;
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD": {
      const isDuplicate = state.toasts.some((t) => t.id === action.toast.id);
      if (isDuplicate) {
        console.warn("[toast] duplicate suppressed:", action.toast.id, "—", action.toast.message);
        return state;
      }
      return { toasts: [...state.toasts, action.toast] };
    }
    case "DISMISS":
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback((toast: Toast) => {
    dispatch({ type: "ADD", toast });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: "DISMISS", id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}