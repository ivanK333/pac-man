const CACHE_NAME = 'my-site-cache-v1';

const URLS = [
  '/auth/register',
  '/auth/login',
  '/forum-topic',
  '/game',
  '/profile',
  '/game-over',
  '/forum',
  '/lead',
];

self.addEventListener('install', (event) => {
  console.log('SW install');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

self.addEventListener('fetch', (event) => {
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

self.addEventListener('activate', (event) => {
  console.log('SW activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => caches.delete(name)));
    }),
  );
});
