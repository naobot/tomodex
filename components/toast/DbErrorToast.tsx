"use client";

import { useEffect } from "react";
import { useToast } from "./ToastContext";

type Props = {
  error: string;
};

// Derives a stable, deterministic id from the error message so that identical
// errors across multiple call sites on the same page collapse into one toast.
function errorToId(message: string): string {
  return "db-error:" + message.toLowerCase().replace(/\s+/g, "-").slice(0, 60);
}

export default function DbErrorToast({ error }: Props) {
  const { addToast } = useToast();

  useEffect(() => {
    addToast({
      id: errorToId(error),
      message: `Something went wrong loading this data. (${error})`,
    });
  }, [error, addToast]);

  // Renders nothing — this component exists only to trigger a side effect
  return null;
}