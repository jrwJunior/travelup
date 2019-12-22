module.exports = {
  "globDirectory": "./build/",
  "globPatterns": [
    "**/*.{html,json,png,ico,svg,webmanifest,js,css,woff2,woff,jpg}"
  ],
  "swDest": "./build/sw.js",
  "swSrc": "./src/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
};