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
    "revision": "487185ca8e64e2333c0cc3dbdc2b510c"
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
    "revision": "fff2ce2ef0d0d8baf9ba0edeb9179442"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "42999a299f2ddd364fb5c3d29698da27"
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
    "url": "static/css/main.cf603386.chunk.css",
    "revision": "6a67d78aeffc3184e56ef47ed962163b"
  },
  {
    "url": "static/js/2.284d7185.chunk.js",
    "revision": "4517af3040b37818747310e03a965533"
  },
  {
    "url": "static/js/main.5b462436.chunk.js",
    "revision": "3993c1ef1d545951a90eb8213b521d56"
  },
  {
    "url": "static/js/runtime-main.04d1ea81.js",
    "revision": "fa82138a23da37fdd21d96bb89ea0076"
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
    "url": "static/media/upload-ios.9c9a1dba.svg",
    "revision": "9c9a1dbaa4f9136d37ad613ecbcf29bb"
  }
];
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
  }));

workbox.routing.registerRoute(
  /.*.(?:png|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
    ]
  }));

// workbox.routing.registerRoute(
//   /(http[s]?:\/\/)firebasestorage.googleapis.com/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'images'
//   }));

const api = [
  /(http[s]?:\/\/)lh3.googleusercontent.com/,
  /(http[s]?:\/\/)graph.facebook.com/,
  /(http[s]?:\/\/)firebasestorage.googleapis.com/
]

api.map(regexp => (
  workbox.routing.registerRoute(
    regexp,
    new workbox.strategies.NetworkFirst())
));

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/travelup/index.html'), {
    blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
  }
);