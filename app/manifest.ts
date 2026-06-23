import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tomodex",
    short_name: "Tomodex",
    description: "Your personal contact directory",
    start_url: "/",
    display: "standalone",
    background_color: "#f0f1f2",
    theme_color: "#f0f1f2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
