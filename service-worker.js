self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/style-darkmode.css',
                '/toggle-switches.css',
                '/manifest.json',            
            ]);
        })
    );
});