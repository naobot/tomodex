import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavigationProvider } from "@/lib/NavigationContext";
import { ToastProvider } from "@/components/toast/ToastContext";
import ToastContainer from "@/components/toast/ToastContainer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Tomodex",
  description: "Your personal contact directory",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tomodex",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f0f1f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationProvider>
      <html lang="en">
        <body id="RootLayout" className="antialiased">
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
          <ServiceWorkerRegistration />
        </body>
      </html>
    </NavigationProvider>
  );
}