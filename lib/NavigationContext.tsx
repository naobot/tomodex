"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PreviousPathnameContext = createContext<string | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previous, setPrevious] = useState<string | null>(null);
  const currentRef = useRef(pathname);

  useEffect(() => {
    if (currentRef.current !== pathname) {
      setPrevious(currentRef.current);
      currentRef.current = pathname;
    }
  }, [pathname]);

  return (
    <PreviousPathnameContext.Provider value={previous}>
      {children}
    </PreviousPathnameContext.Provider>
  );
}

export function usePreviousPathname() {
  return useContext(PreviousPathnameContext);
}