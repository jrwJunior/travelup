importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', evt => {
  if (evt.data && evt.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

const precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "01c7263c608f13df44afae7126546cc2"
  },
  {
    "url": "favicon/apple-touch-icon.png",
    "revision": "9f6ab01bf39dfc3a3ebd75ce07805da1"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "e28f0884cf4cbdae26de1f170435d537"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "78fdbbb399de961b1a164034295300b4"
  },
  {
    "url": "favicon/favicon-96x96.png",
    "revision": "22fc6aa88342f7bbc5e5f71f378df936"
  },
  {
    "url": "favicon/favicon.ico",
    "revision": "63fae70443b31ce214780f2dbc9c6190"
  },
  {
    "url": "favicon/safari-pinned-tab.svg",
    "revision": "56011a89207a8bb7b9d22a47d01429c1"
  },
  {
    "url": "icon-192x192.png",
    "revision": "c77af1b934a72a6675aac2acfac09464"
  },
  {
    "url": "icon-512x512.png",
    "revision": "52efa13aee76de1959dc4f414c7ddb66"
  },
  {
    "url": "index.html",
    "revision": "76e6f2d4dbe8f7b597e93b31fee30dce"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "5fec3b539377d934e7516a27cfef9d34"
  },
  {
    "url": "precache-manifest.9b1ef2daabd77e9038e2f4b461f32440.js",
    "revision": "9b1ef2daabd77e9038e2f4b461f32440"
  },
  {
    "url": "service-worker.js",
    "revision": "634fe2e49d9935fed4695f8760dc4838"
  },
  {
    "url": "splash/launch-1125x2436.png",
    "revision": "94eacecb09cfb25c52f4b5a794e766c0"
  },
  {
    "url": "splash/launch-1242x2148.png",
    "revision": "cfa6683eef46d5e26edc4522bcf2a7bb"
  },
  {
    "url": "splash/launch-1536x2048.png",
    "revision": "a14c2a0456804183c340f0e5c91880c5"
  },
  {
    "url": "splash/launch-1668x2048.png",
    "revision": "8b6a6ce8242eeb4f0cff6fea9b8edeca"
  },
  {
    "url": "splash/launch-2048x2732.png",
    "revision": "281dcff934096ec5c3fa5364e2e22751"
  },
  {
    "url": "splash/launch-640x1136.png",
    "revision": "6e0c7168b2ac971a099b1191d93ef830"
  },
  {
    "url": "splash/launch-750x1294.png",
    "revision": "411be3a5350e3379b20fa65e854174e0"
  },
  {
    "url": "static/css/main.c86a47c3.chunk.css",
    "revision": "d72c8df3535151f221d0feebfcdd4bc9"
  },
  {
    "url": "static/js/2.aa9276dd.chunk.js",
    "revision": "d27d13f4b056749696cc52c52d67df42"
  },
  {
    "url": "static/js/main.b151a673.chunk.js",
    "revision": "ca03f323c28767c33b2758de30b00744"
  },
  {
    "url": "static/js/runtime-main.fa0e6e2f.js",
    "revision": "b72d310a72cf8c35e188a0ece704d95a"
  },
  {
    "url": "static/media/CandaraBold.083a0630.woff2",
    "revision": "083a0630475aaea4473a04ee146b1206"
  },
  {
    "url": "static/media/CandaraBold.c6f973d5.woff",
    "revision": "c6f973d5591c0c51faac551fd95754f2"
  },
  {
    "url": "static/media/fb.e0b75637.svg",
    "revision": "e0b75637f010dc1a655005ec5cf2b3d1"
  },
  {
    "url": "static/media/g-pl.4a77ccf6.svg",
    "revision": "4a77ccf66f6f9931425eb0d9d61277c3"
  },
  {
    "url": "static/media/login-table.fc87fb7d8bae609f0b9786502704b0a9.fe781118.jpg",
    "revision": "fe7811185c0606f9b50b44f8e6eed2dc"
  },
  {
    "url": "static/media/login.fc87fb7d8bae609f0b9786502704b0a9.68e6b7b2.jpg",
    "revision": "68e6b7b26de23167bb8010650f6927ba"
  },
  {
    "url": "static/media/logo.8c2968c8.svg",
    "revision": "8c2968c8d6e4758a15bd6c7a987f6597"
  },
  {
    "url": "static/media/pencil.4c4bbc15.svg",
    "revision": "4c4bbc15ec90beab9ab69e96ee19ae15"
  },
  {
    "url": "static/media/pictures.98ce30f0.svg",
    "revision": "98ce30f0b015be3a472c657a3aeb98db"
  },
  {
    "url": "static/media/SFProDisplayRegular.89a0dda9.woff",
    "revision": "89a0dda9a4e0fcbf9d90f507feb77486"
  },
  {
    "url": "static/media/SFProDisplayRegular.abe60269.woff2",
    "revision": "abe60269bd99b7f36cd026bd02af92a6"
  },
  {
    "url": "static/media/SFProDisplaySemibold.2c151db5.woff",
    "revision": "2c151db57c2192e8e7a26ea88d40fa46"
  },
  {
    "url": "static/media/SFProDisplaySemibold.af64ab08.woff2",
    "revision": "af64ab08547cc18daa32439d1f6c9c05"
  },
  {
    "url": "static/media/signUp-tabel.Ugpcxb0jG4Q.9fdec093.jpg",
    "revision": "9fdec0930b1010a2a072239f9d87be25"
  },
  {
    "url": "static/media/signUp.Ugpcxb0jG4Q.887a40b3.jpg",
    "revision": "887a40b37ee4de5c9ade6f404a5caee8"
  },
  {
    "url": "static/media/success.47f32db7.svg",
    "revision": "47f32db73064bfea7ebc388bd6a1a094"
  },
  {
    "url": "static/media/upload-ios.e4e3f98d.svg",
    "revision": "e4e3f98d4b07591a56a6fd6bfd107ad0"
  }
];
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