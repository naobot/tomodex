"use client";

import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from "react";

type SidebarContextValue = {
  query: string;
  setQuery: (q: string) => void;
  registerOpenModal: (fn: () => void) => void;
  openAddModal: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const openModalRef = useRef<(() => void) | null>(null);

  const registerOpenModal = useCallback((fn: () => void) => {
    openModalRef.current = fn;
  }, []);

  const openAddModal = useCallback(() => {
    openModalRef.current?.();
  }, []);

  return (
    <SidebarContext.Provider value={{ query, setQuery, registerOpenModal, openAddModal }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
