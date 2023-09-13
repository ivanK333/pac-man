window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js', { scope: "." });

      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope,
      );
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  }
});
