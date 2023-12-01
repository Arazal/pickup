/* eslint-disable-next-line no-restricted-globals */

const assets = [
  '/',
  '/index.html',
  '/static/',
]

self.addEventListener('install', e => {
    caches.open('assets').then( cashe => {
        cashe.addAll(assets)
    })
})

// self.addEventListener('fetch', (e) => {
//     // const res = new Response(e.request.url)
//     // e.respondWith(res)
//     e.respondWith(
//         caches.match(e.request)
//             .then( res => {
//                 if(res) {
//                     return res
//                 } else {
//                     return fetch(e.request)
//                 }
//             })
//     )
// })

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(cashedResponse => {
                const fetchPromise = fetch(e.request).then(
                    networkresponse => {
                        caches.open('assets').then(cashe => {
                            cashe.put(e.request, networkresponse.clone())
                            return networkresponse
                        })
                    }
                )
                return cashedResponse || fetchPromise
            })
    )
})