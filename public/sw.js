// Minimal no-op service worker — satisfies PWA install requirements
// without any caching strategy. Replace with serwist/workbox when
// offline support is needed.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
