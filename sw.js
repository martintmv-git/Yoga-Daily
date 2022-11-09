const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
    '/',
    '/index.html',
    '/morningyoga.html',
    '/404.html',
    '/foryou.html',
    '/powerflow.html',
    '/profile.html',
    '/music.html',
    '/js/script.js',
    '/js/app.js',
    '/js/scriptnav.js',
    '/css/index.css',
    '/css/profile.css',
    '/css/style.css',
    '/css/video.css',
    '/css/foryou.css',
    'image/icon-192x192.png',
    'image/icon-256x256.png',
    'image/icon-384x384.png',
    'image/icon-512x512.png',
    'image/clockam.png',
    'image/clockpm.png',
    'image/logodaily.png',
    'image/morningyoga.jpeg',
    'image/yogadaily.png',
    'image/yogalogo.png',
    'image/yogapose1.svg',
    'image/yogapose2.jpeg',
    'image/hoverpicture.png',
    'videos/yogavideo1.mp4',


    '/manifest.json',

    'https://fonts.googleapis.com/css?family=Poppins',
    'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2'
];
// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if(keys.length > size){
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };

// install event
self.addEventListener("install", evt =>{
   // console.log("Service Worker: I am being installed, hello world!");
    evt.waitUntil(caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets)
    })
    );

  });
// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });
// fetch events
self.addEventListener('fetch', evt => {
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
      evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 15);
              return fetchRes;
            })
          });
        }).catch(() => {
          if(evt.request.url.indexOf('.html') > -1){
            return caches.match('/404.html');
          } 
        })
      );
    }
  });
// push events
  self.addEventListener("push", evt=>{
      console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
      if(evt.data){
        pushdata=JSON.parse(evt.data.text());		
        console.log("Service Worker: I received this:",pushdata);
        if((pushdata["title"]!="")&&(pushdata["message"]!="")){			
          const options={ body:pushdata["message"] }
          self.registration.showNotification(pushdata["title"],options);
          console.log("Service Worker: I made a notification for the user");
        } else {
          console.log("Service Worker: I didn't make a notification for the user, not all the info was there :(");			
        }
      }      
  })  