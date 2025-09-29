
const CACHE_NAME = 'udaan-mithra-v1';
// These URLs will be pre-cached
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/translations.ts',
  '/hooks/useUserData.ts',
  '/hooks/useTranslation.ts',
  '/context/LanguageContext.tsx',
  '/components/Onboarding.tsx',
  '/components/Dashboard.tsx',
  '/components/TeacherDashboard.tsx',
  '/components/Signup.tsx',
  '/components/Login.tsx',
  '/components/LessonView.tsx',
  '/components/Leaderboard.tsx',
  '/components/SubjectLessonsView.tsx',
  '/components/LanguageSwitcher.tsx',
  '/components/Icons.tsx',
  // External CDNs from index.html
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap',
  // External CDNs from importmap
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/client'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(PRECACHE_URLS);
        })
      .then(self.skipWaiting())
      .catch(error => {
          console.error('Failed to cache assets:', error);
          // Don't fail the install, but log the error. Some CDNs might be tricky.
      })
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses from a cache first, falling back to network.
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // If we have a cached response, return it
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from the network
        return fetch(event.request).then(response => {
            // If the request is successful, clone it and cache it for future use
            if (response.status === 200) {
                 const responseToCache = response.clone();
                 caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
            }
            return response;
        }).catch(error => {
            console.error('Fetch failed; returning offline page instead.', error);
            // Optionally, return a fallback offline page here
        });
      })
    );
});