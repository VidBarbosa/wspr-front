const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DOCUMENT_CACHE = `documents-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-256.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (!key.includes(CACHE_VERSION)) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

function isNavigationRequest(request) {
  return request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (isNavigationRequest(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(DOCUMENT_CACHE);
      const cached = await cache.match(request);
      const networkPromise = fetch(request)
        .then((response) => {
          cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      return cached || networkPromise;
    })());
    return;
  }

  if (request.method === "GET" && (request.destination === "style" || request.destination === "script" || request.destination === "image" || request.url.endsWith(".css") || request.url.endsWith(".js") || request.url.includes("/icons/"))) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      } catch (e) {
        return cached || Response.error();
      }
    })());
    return;
  }
});
