const CACHE_NAME = 'sublistore-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html',
]

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        // Es normal que algunos assets fallen en modo offline
        console.log('Some assets could not be cached')
      })
    })
  )
})

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retornar respuesta en caché si existe
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          // No cachear respuestas inválidas
          if (!response || response.status !== 200 || response.type === 'error') {
            return response
          }

          // Clonar la respuesta
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Retornar página offline si existe
          return caches.match('/offline.html')
        })
    })
  )
})
