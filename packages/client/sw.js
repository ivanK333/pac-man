const CACHE_NAME = 'my-site-cache-v1';
const timeout = 400;

const URLS = [
  '/index.html',
  '/src/assets/images/404-image.svg',
  '/src/assets/images/500-image.svg',
  '/src/assets/images/addCommentImage.png',
  '/src/assets/images/default-avatar.svg',
  '/src/assets/images/pacman-background.svg',
  '/src/assets/images/blueSpriteForLoader.svg',
  '/src/assets/images/forum-background.svg',
  '/src/assets/images/logo.svg',
  '/src/assets/images/pacman-error.svg',
  '/src/assets/images/play.svg',
  '/src/assets/images/purple_ghost.png',
  '/src/assets/images/red_ghost.png',
  '/src/assets/images/blueSprite.svg',
];

const addToCache = async (urls) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urls);
  } catch (error) {
    console.log(error);
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(addToCache(URLS));
});

self.addEventListener('activate', async () => {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
  } catch (error) {
    console.log(error);
  }
});

const getFromNetwork = (request, timeout) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);

    fetch(request).then((response) => {
      clearTimeout(timeoutId);

      const responseClone = response.clone();

      caches
        .open(CACHE_NAME)
        .then((cache) => cache.put(request, responseClone));

      resolve(response);
    }, reject);
  });
};

const getFromCache = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const result = await cache.match(request);

  return result || Promise.reject('no-match');
};

self.addEventListener('fetch', (event) => {
  event.respondWith(
    getFromNetwork(event.request, timeout).catch(() =>
      getFromCache(event.request),
    ),
  );
});
