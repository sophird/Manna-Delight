const CACHE_NAME = 'manna-delight-v2';
const APP_SHELL = [
  '/', '/index.html', '/manifest.json', '/icons/icon.svg',
  '/images/brand/logo.webp',
  '/images/gallery/gallery-1.webp',
  '/images/gallery/gallery-2.webp',
  '/images/gallery/gallery-3.webp',
  '/images/gallery/gallery-4.webp',
  '/images/gallery/gallery-5.webp',
  '/images/gallery/gallery-6.webp',
  '/images/gallery/gallery-7.webp',
  '/images/gallery/gallery-8.webp',
  '/images/hero/hero.webp',
  '/images/hero/menu-banner.webp',
  '/images/payments/gcash.webp',
  '/images/payments/maya.webp',
  '/images/people/nathaniel-lomboy.webp',
  '/images/people/peniel-andrea-lomboy.webp',
  '/images/products/bean-bliss.webp',
  '/images/products/biscoff-latte.webp',
  '/images/products/cafe-latte.webp',
  '/images/products/caramel-macchiato.webp',
  '/images/products/choco-lava.webp',
  '/images/products/chocolate-chip.webp',
  '/images/products/lotus-biscoff.webp',
  '/images/products/matcha-creamcheese.webp',
  '/images/products/matcha-milk.webp',
  '/images/products/oreo-cheesecake.webp',
  '/images/products/oreo-milk.webp',
  '/images/products/red-velvet-creamcheese.webp',
  '/images/products/smores.webp',
  '/images/products/strawberry-matcha-detail.webp',
  '/images/products/strawberry-matcha-thumb.webp',
  '/images/products/strawberry-matcha.webp',
  '/images/products/strawberry-milk.webp',
  '/images/products/white-chocolate-chip.webp',
  '/images/signatures/brownie.webp',
  '/images/signatures/dubai-cookie.webp',
  '/images/signatures/matcha-meets-oreo.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network first, fall back to cached app shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', copy));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
