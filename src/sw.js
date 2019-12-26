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
  }), 'GET');

  workbox.routing.registerRoute(
    /.*.(?:png|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'meme-images'
    }), 'GET');

workbox.routing.registerRoute(
  /(http[s]?:\/\/)firebasestorage.googleapis.com/,
  new workbox.strategies.NetworkFirst(), 'GET');

workbox.routing.registerRoute(
  /(http[s]?:\/\/)firestore.googleapis.com/,
  new workbox.strategies.NetworkFirst(), 'GET');