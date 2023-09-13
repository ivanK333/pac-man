window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');

      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope,
      );
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  }
});
