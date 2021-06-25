self.addEventListener('install',(ev)=>{
    console.log('service worker installing');
})

self.addEventListener('activate',(ev)=>{
    console.log('Service worker activating');
    return self.clients.claim();
})

self.addEventListener('fetch',(ev)=>{
    console.log('Service Worker Fetching');
    ev.respondWith(fetch(ev.request));
})

