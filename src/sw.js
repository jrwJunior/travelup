importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', evt => {
  if (evt.data && evt.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

const precacheManifest = [];
workbox.precaching.precacheAndRoute(precacheManifest);

workbox.routing.registerRoute(
  /(http[s]?:\/\/)restcountries.eu/,
  new workbox.strategies.CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
    ]
  }), 'GET');

workbox.routing.registerRoute(
  /.*.(?:png|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'meme-images'
  }), 'GET');

const api = [
  /(http[s]?:\/\/)lh3.googleusercontent.com/,
  /(http[s]?:\/\/)graph.facebook.com/,
  /(http[s]?:\/\/)firebasestorage.googleapis.com/,
  /(http[s]?:\/\/)firestore.googleapis.com/
]

api.map(regexp => (
  workbox.routing.registerRoute(
    regexp,
    new workbox.strategies.NetworkFirst(), 'GET')
));

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/travelup/index.html'), {
    blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
  }
);