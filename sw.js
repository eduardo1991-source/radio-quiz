const CACHE_NAME = "radio-quiz-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",

	".files/chapter1_foundation.json",
	".files/chapter1_intermediate.json",
	".files/chapter1_full.json",
	".files/chapter2_foundation.json",
	".files/chapter2_intermediate.json",
	".files/chapter2_full.json",
	".files/chapter3_foundation.json",
	".files/chapter3_intermediate.json",
	".files/chapter3_full.json",
	".files/chapter4_foundation.json",
	".files/chapter4_intermediate.json",
	".files/chapter4_full.json",
	".files/chapter5_foundation.json",
	".files/chapter5_intermediate.json",
	".files/chapter5_full.json",
	".files/chapter6_foudation.json",
	".files/chapter6_intermediate.json",
	".files/chapter6_full.json",
	".files/chapter7_foundation.json",
	".files/chapter7_intermediate.json",
	".files/chapter7_full.json",
	".files/chapter8_foundation.json",
	".files/chapter8_intermediate.json",
	".files/chapter8_full.json",
	".files/chapter9_intermediate.json",
	".files/chapter9_full.json",
	".files/appendix_foundation_mock1.json",
	".files/appendix_foundation_mock2.json",
	".files/appendix_foundation_mock3.json",
	".files/appendix_foundation_mock4.json",
	".files/appendix_intermediate_mock1.json",
	".files/appendix_intermediate_mock2.json",
	".files/appendix_intermediate_mock3.json",
	".files/appendix_intermediate_mock4.json",
	".files/appendix_full_mock1.json",
	".files/appendix_full_mock2.json",
	".files/appendix_full_mock3.json",
	".files/appendix_full_mock4.json",
	".files/appendix_complete_mock1.json",
	".files/appendix_complete_mock2.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(fetchResp => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResp.clone());
          return fetchResp;
        });
      });
    }).catch(() =>
      new Response("Offline", { status: 503, statusText: "Offline" })
    )
  );
});
