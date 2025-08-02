// Nama cache
const CACHE_NAME = 'toko-Super-Games';

// Daftar file yang akan di-cache (App Shell)
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './maintens.html',
    './android-chrome-512x512.png'
    // Jika punya file CSS atau JS terpisah, tambahkan di sini
    // '/style.css',
    // '/app.js'
];

// 1. Event 'install': Cache the App Shell.
// We remove skipWaiting() here to allow the update notification in index.html to work.
self.addEventListener('install', event => {
    console.log('SW Install: Caching App Shell');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened, adding URLs');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Event 'activate': Clean up old caches.
self.addEventListener('activate', event => {
    console.log('SW Activate: Cleaning up old caches');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    // Tell the active service worker to take control of the page immediately.
    return self.clients.claim();
});

// 3. Event 'fetch': Use the "Network First" strategy.
self.addEventListener('fetch', event => {
    // We only want to apply this strategy to navigation requests (HTML pages) and our assets
    // to avoid interfering with other requests (e.g., to third-party APIs).
    if (event.request.mode === 'navigate' || urlsToCache.includes(new URL(event.request.url).pathname)) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    // If fetch is successful, clone the response, cache it, and return it.
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // If fetch fails (offline), try to get the response from the cache.
                    console.log(`Fetch failed; serving from cache for: ${event.request.url}`);
                    return caches.match(event.request);
                })
        );
    }
});

// 4. Listen for the message from the client (index.html) to activate the new SW.
self.addEventListener('message', event => {
    if (event.data && event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
