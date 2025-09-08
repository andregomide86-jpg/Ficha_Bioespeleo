const CACHE_NAME = 'subterranea-ficha-v2'; // Mude a versão se fizer alterações futuras
// Lista de arquivos essenciais para o app funcionar offline
const ARQUIVOS_PARA_CACHE = [
  './',
  'index.html',
  'icon-512x512.png'
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto');
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );
});

// Evento de Fetch: Responde com os arquivos do cache se estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se o arquivo estiver no cache, retorna ele. Senão, busca na rede.
      return response || fetch(event.request);
    })
  );
});