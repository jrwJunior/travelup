importScripts(`${process.env.PUBLIC_URL}/workbox-v4.3.1/workbox-sw.js`);

workbox.setConfig({ modulePathPrefix: `${process.env.PUBLIC_URL}/workbox-v4.3.1/` });

self.addEventListener('message', evt => {
  if (evt.data && evt.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

const precacheManifest = [];
workbox.precaching.precacheAndRoute(precacheManifest);

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});

workbox.routing.registerRoute(
  /(http[s]?:\/\/)restcountries.eu/,
  new workbox.strategies.CacheFirst({
    cacheName: 'api-cache',
  }), 'GET');

workbox.routing.registerRoute(
  /(http[s]?:\/\/)firebasestorage.googleapis.com/,
  new workbox.strategies.NetworkFirst(), 'GET');

workbox.routing.registerRoute(
  /(http[s]?:\/\/)firestore.googleapis.com/,
  new workbox.strategies.NetworkFirst(), 'GET');