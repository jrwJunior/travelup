importScripts('/travelup/workbox-v4.3.1/workbox-sw.js');

workbox.setConfig({ modulePathPrefix: '/travelup/workbox-v4.3.1/' });

self.addEventListener('message', evt => {
  if (evt.data && evt.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

const precacheManifest = [
  {
    "url": "404.html",
    "revision": "46c90efd5431e54b2607cd2d9a1e7711"
  },
  {
    "url": "asset-manifest.json",
    "revision": "0f28509289b5921dd0f63669813e72df"
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
    "revision": "46c90efd5431e54b2607cd2d9a1e7711"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "5fec3b539377d934e7516a27cfef9d34"
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
    "url": "static/css/main.3388b3c7.chunk.css",
    "revision": "3ff41e237abad766608db3c9e753706f"
  },
  {
    "url": "static/js/2.6bf4a21d.chunk.js",
    "revision": "04f8cd8b92b1a25ab3e2cf7416ff4183"
  },
  {
    "url": "static/js/main.2b540cf7.chunk.js",
    "revision": "3c3925240c62ab26dddd5966129e464a"
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
    "url": "static/media/upload-ios.e4e3f98d.svg",
    "revision": "e4e3f98d4b07591a56a6fd6bfd107ad0"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.dev.js",
    "revision": "5446355eef3aa184b5b6eebfcd81f8d9"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.prod.js",
    "revision": "1ffcc362312a9e8ef4e28280ace2a1bd"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.dev.js",
    "revision": "0508d13784c9b0549663f40e3fe55d37"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.prod.js",
    "revision": "ee27c0fdc836f6a2dc656b25a680f9e4"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.dev.js",
    "revision": "ecba3679d285394f1c9e219681662721"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.prod.js",
    "revision": "a38e8afa80070ec9dff5dc2fb116f1c2"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.dev.js",
    "revision": "2912182ccc99b017a8c36802cf9d983f"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.prod.js",
    "revision": "5d14d8267f65030735589e4b664ee3bf"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.dev.js",
    "revision": "43c236fe62480f042c35e8b898ca3367"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.prod.js",
    "revision": "a767f3bbd2773a0bea34ff841b51ab64"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.dev.js",
    "revision": "a8f30e409f7037906053acec7d709beb"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.prod.js",
    "revision": "e2b19a3eda50f48ce7fc48640a523353"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.dev.js",
    "revision": "3fba0947d12d42834b81499fafc76e82"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.prod.js",
    "revision": "6af4fb51a5249c4e0ed7bc61ed59836d"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.dev.js",
    "revision": "8fbbefcd70c998a3cd35f02e6a8ac4e7"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.prod.js",
    "revision": "e8f5c57430ec7c448d30015ff4bd5896"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.dev.js",
    "revision": "0f15c57cf5c75cc72b6f23ad28a941d1"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.prod.js",
    "revision": "97c430406d13f4b91c805594ef351261"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.dev.js",
    "revision": "471b8e0f45e6e5e679d04f60c6466e7f"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.prod.js",
    "revision": "d3fa76a1c38649d596b1d2ffaf398128"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.dev.js",
    "revision": "d1c19737e82e2f6bd567aaf384683174"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.prod.js",
    "revision": "6033181992f0bc562ab1ef5f9ba34697"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.dev.js",
    "revision": "eed9eb6f7b0672c45db5408d05efe9b9"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.prod.js",
    "revision": "4407a13523f1fa1064f616e9047b6148"
  },
  {
    "url": "workbox-v4.3.1/workbox-sw.js",
    "revision": "6e1e47d706556eac8524f396e785d4bb"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.dev.umd.js",
    "revision": "c17834573a1b48bb8cf33b12128bdae9"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.prod.umd.js",
    "revision": "c65238721ed1187cf832e51a9e34724a"
  }
];
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