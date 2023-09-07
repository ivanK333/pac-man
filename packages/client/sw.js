const CACHE_NAME = 'my-site-cache-v1';

const URLS = [
  '/',
  '/auth/register',
  '/auth/login',
  '/forum-topic',
  '/game',
  '/profile',
  '/game-over',
  '/forum',
  '/lead',
  './src/assets/images/404-image.svg',
  './src/assets/images/500-image.svg',
  './src/assets/images/addCommentImage.png',
  './src/assets/images/default-avatar.svg',
  './src/assets/images/pacman-background.svg',
  './src/assets/images/blueSpriteForLoader.svg',
  './src/assets/images/forum-background.svg',
  './src/assets/images/logo.svg',
  './src/assets/images/pacman-error.svg',
  './src/assets/images/play.svg',
  './src/assets/images/purple_ghost.png',
  './src/assets/images/red_ghost.png',
  './src/assets/images/blueSprite.svg',
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
  console.log('SW install');
  event.waitUntil(addToCache(URLS));
});

self.addEventListener('fetch', (event) => {
  console.log('SW fetch');
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then((response) => {
      // Если кешированный ресурс найден, выдаём его
      if (response) {
        console.log('кешированный ресурс найден');
        return response;
      }

      const fetchRequest = event.request.clone();

      // Если ресурса нет в кэше, делаем запрос на сервер
      return fetch(fetchRequest).then((response) => {
        // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Клонируем ответ, так как response может быть использован только один раз
        const responseToCache = response.clone();

        // Получаем доступ к кешу по CACHE_NAME
        caches
          .open(CACHE_NAME) // Открываем кэш
          .then((cache) => {
            // Записываем в кеш ответ, используя в качестве ключа запрос
            cache.put(event.request, responseToCache);
          });

        // Отдаём в основной поток ответ
        return response;
      });
    }),
  );
});

self.addEventListener('activate', async () => {
  console.log('SW activate');
  try {
    const cacheNames = await caches.keys();

    await Promise.all(cacheNames.map((name) => caches.delete(name)));
  } catch (error) {
    console.log(error);
  }
});
