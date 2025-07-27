// Nama cache
const CACHE_NAME = 'toko-Super-Games';

// Daftar file yang akan di-cache (App Shell)
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './android-chrome-512x512.png'
    // Jika punya file CSS atau JS terpisah, tambahkan di sini
    // '/style.css',
    // '/app.js'
];

// Event 'install': dijalankan saat service worker pertama kali di-install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event 'fetch': dijalankan setiap kali ada permintaan resource (misal gambar, halaman)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika resource ditemukan di cache, langsung kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak, ambil dari network
                return fetch(event.request);
            })
    );
});
