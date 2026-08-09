const CACHE='wb-office-v2';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-maskable.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  // HTML 导航请求：network-first，确保用户拿到最新版（离线回退缓存）
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(resp=>{
        if(resp && resp.status===200){
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return resp;
      }).catch(()=>{
        return caches.match(e.request).then(c=>c||caches.match('./index.html')).then(c=>c||Response.error());
      })
    );
    return;
  }
  // 其他资源：stale-while-revalidate（先缓存后台更新）
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const network=fetch(e.request).then(resp=>{
        if(resp && resp.status===200 && (resp.type==='basic'||resp.type==='cors')){
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return resp;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
