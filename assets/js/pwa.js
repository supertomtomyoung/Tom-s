(function () {
  if ('serviceWorker' in navigator) {
    const PREFETCH = true;
    const PREFETCH_LINK_RELS = ['index', 'next', 'prev', 'prefetch'];
    function prefetchCache() {
      if (navigator.serviceWorker.controller) {
        const links = document.querySelectorAll(
          PREFETCH_LINK_RELS.map((rel) => `link[rel=${rel}]`).join(','),
        );
        if (links.length > 0) {
          Array.from(links).map((link) => {
            const href = link.getAttribute('href');
            navigator.serviceWorker.controller.postMessage({
              action: 'cache',
              url: href,
            });
          });
        }
      }
    }

    navigator.serviceWorker
      .register('/serviceWorker.js', { scope: '/' })
      .then(() => {
        console.log('Service Worker Registered');
      });

    navigator.serviceWorker.ready.then(() => {
      if (PREFETCH) {
        console.log('Service Worker Ready');
        prefetchCache();
      }
    });
  }
}());
