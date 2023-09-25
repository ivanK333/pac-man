export default function startSW() {
  if ('serviceWorker' in navigator) {
    if (
      window.location.pathname !== '/auth/login' &&
      window.location.pathname !== '/auth/register'
    ) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            './sw.js',
          );

          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope,
          );
        } catch (error) {
          console.log('ServiceWorker registration failed: ', error);
        }
      });
    }
  }
}
