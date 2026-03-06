"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NavigationContextValue = {
  previousPathname: string | null;
  isNavigating: boolean;
  startNavigating: () => void;
};

const NavigationContext = createContext<NavigationContextValue>({
  previousPathname: null,
  isNavigating: false,
  startNavigating: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previous, setPrevious] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const currentRef = useRef(pathname);

  useEffect(() => {
    if (currentRef.current !== pathname) {
      setPrevious(currentRef.current);
      currentRef.current = pathname;
      setIsNavigating(false); // only clear when pathname actually changed
    }
    // Pathname changed — navigation is complete
    setIsNavigating(false);
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{
      previousPathname: previous,
      isNavigating,
      startNavigating: () => setIsNavigating(true),
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function usePreviousPathname() {
  return useContext(NavigationContext).previousPathname;
}

export function useNavigationLoader() {
  const { isNavigating, startNavigating } = useContext(NavigationContext);
  return { isNavigating, startNavigating };
}