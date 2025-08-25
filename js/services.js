
async function loadServices() {
  const res = await fetch('/data/services.json');
  const data = await res.json();
  const services = data.items;

  const featured = document.getElementById('featured-services');
  if (featured) {
    featured.innerHTML = services.slice(0,3).map(s => `
      <article class="border rounded-xl p-4 bg-white shadow-sm">
        <h3 class="font-semibold text-lg mb-1">${s.name}</h3>
        <p class="text-xs uppercase tracking-wide text-gray-500 mb-2">${s.category}</p>
        <div class="text-sm"><span class="font-medium">Giá:</span> ${s.price}</div>
      </article>
    `).join('');
  }

  const list = document.getElementById('service-list');
  if (list) {
    list.innerHTML = services.map(s => `
      <article class="border rounded-xl p-4 bg-white shadow-sm">
        <h3 class="font-semibold text-lg mb-1">${s.name}</h3>
        <p class="text-xs uppercase tracking-wide text-gray-500 mb-2">${s.category}</p>
        <p class="text-sm text-gray-600 mb-3">${s.description || s.short || ""}</p>
        <ul class="text-sm mb-3">
          <li><span class="font-medium">Thời lượng:</span> ${s.duration || "—"}</li>
          <li><span class="font-medium">Giá:</span> ${s.price}</li>
        </ul>
      </article>
    `).join('');

    const schema = {
      "@context": "https://schema.org",
      "@graph": services.map((s) => ({
        "@type": "Service",
        "name": s.name,
        "description": s.description || s.short || s.name,
        "serviceType": s.category,
        "provider": {
          "@type": "BeautySalon",
          "name": "Amie Beauty Skinlab",
          "address": "111 Đường D3, KDC Nam Long, phường Phước Long B, TP. Thủ Đức, HCM",
          "telephone": "+84358723745"
        },
        "areaServed": "Thủ Đức, Hồ Chí Minh, Việt Nam",
        "offers": { "@type": "Offer", "priceCurrency": "VND", "price": s.price_numeric || "" }
      })) 
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  const rows = document.getElementById('price-rows');
  if (rows) {
    rows.innerHTML = services.map(s => `
      <tr>
        <td class="p-3 border-b">${s.name}</td>
        <td class="p-3 border-b">${s.duration || "—"}</td>
        <td class="p-3 border-b">${s.price}</td>
      </tr>
    `).join('');
  }
}
document.addEventListener('DOMContentLoaded', loadServices);
