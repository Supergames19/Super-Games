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

// Event 'install': Menyimpan file baru ke cache baru
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache baru dibuka:', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    );
});

// Event 'activate': Membersihkan cache lama
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Jika nama cache tidak sama dengan nama cache yang baru, hapus.
                    if (cacheName !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Event 'fetch': Menyajikan konten dari cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika ditemukan di cache, sajikan dari cache. Jika tidak, ambil dari network.
                return response || fetch(event.request);
            })
    );
});
