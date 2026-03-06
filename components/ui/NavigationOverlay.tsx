"use client";

import { useNavigationLoader } from "@/lib/NavigationContext";
import styles from "./NavigationOverlay.module.css";

export default function NavigationOverlay() {
  const { isNavigating } = useNavigationLoader();

  if (!isNavigating) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.barTrack}>
        <div className={styles.bar} />
      </div>
    </div>
  );
}