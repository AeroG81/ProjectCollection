importScripts('src/js/idb.js');
importScripts('src/js/utility.js')

const CACHE_STATIC_VER = 'static-v8';
const CACHE_DYNAMIC_VER = 'dynamic-v6';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/js/app.js',
  '/src/js/feed.js',
  '/src/js/idb.js',
  '/src/js/utility.js',
  '/src/js/promise.js',
  '/src/js/fetch.js',
  '/src/js/material.min.js',
  '/src/css/app.css',
  '/src/css/feed.css',
  '/src/images/main-image.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

/*
function trimCache(cacheName, maxItems) {
  caches.open(cacheName)
    .then((cache) => {
      return cache.keys().then((keys) => {
        if (keys.length > maxItems) {
          cache.delete(keys[0])
            .then(trimCache(cacheName, maxItems))
        }
      })
    })

}
*/
self.addEventListener('install', (ev) => {
  console.log('Service Worker Installing', ev);
  ev.waitUntil(
    caches.open(CACHE_STATIC_VER)
      .then((cache) => {
        cache.addAll(STATIC_FILES);
      })
  )
});

self.addEventListener('activate', (ev) => {
  console.log('Service Worker Activating', ev);
  ev.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {//transfer array of string into array of promises
          if (key !== CACHE_STATIC_VER && key !== CACHE_DYNAMIC_VER) {
            console.log('removing old cache');
            return caches.delete(key);
          }
        }));
      })
  )
  return self.clients.claim(); //avoid problems
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', (ev) => {

  var url = 'https://pwagram-1b1cf-default-rtdb.firebaseio.com/posts';
  if (ev.request.url.indexOf(url) > -1) {
    ev.respondWith(fetch(ev.request)
      .then((res) => {
        var clonedRes = res.clone();
        clearAllData('posts')
          .then(() => {
            return clonedRes.json()
          })
          .then((data) => {
            for (let key in data) {
              writeData('posts', data[key]);
            }
          });
        return res;
      })
    );
  } else if (isInArray(ev.request.url, STATIC_FILES)) {
    ev.respondWith(
      caches.match(ev.request)
    );
  } else {
    ev.respondWith(
      caches.match(ev.request)
        .then(function (response) {
          if (response) {
            return response;
          } else {
            return fetch(ev.request)
              .then(function (res) {
                return caches.open(CACHE_DYNAMIC_VER)
                  .then(function (cache) {
                    // trimCache(CACHE_DYNAMIC_VER, 3);
                    cache.put(ev.request.url, res.clone());//res will be consumed so after this line it would be empty, to prevent this, clone() need to be used to avoid this problem
                    return res; //res should also be return so that html file will get the response
                    //it would still work after reload since it was cached, this is to prevent user need to reload and maintain the stability of app

                  })
              })
              .catch(function (err) {
                return caches.open(CACHE_STATIC_VER)
                  .then(function (cache) {
                    if (ev.request.headers.get('accept').includes('text/html')) {
                      return cache.match('/offline.html');
                    }
                  });
              });
          }
        })
    );
  }
});

/*
Cache with network fallback (with dynamic caching and offline fallback page)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});

Network with cache fallback (with dynamic chaching)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
      })
      .catch(function(err) {
        return caches.match(event.request);
      })
  );
});

Cache-only
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
  );
});

Network-only
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
  );
});
*/

self.addEventListener('sync', (ev) => {
  console.log('Background sync', ev);
  if (ev.tag === 'sync-new-posts') {
    console.log('syncing new post');
    ev.waitUntil(
      readAllData('sync-posts').then((data) => {
        console.log(data);
        for (let dt of data) {
          fetch('https://pwagram-1b1cf-default-rtdb.firebaseio.com/posts.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              id: dt.id,
              title: dt.title,
              location: dt.location,
              image: dt.image
            })
          }).then(function (res) {
            console.log('Sent data', res);
            if (res.ok) {
              clearItemFromData('sync-posts', dt.id)
            }
          }).catch((err)=>{
            console.log('err while syncing data',err);
          })
        }
      })
    )
  }
})