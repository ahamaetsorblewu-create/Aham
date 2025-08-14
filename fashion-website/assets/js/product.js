(function(){
  function byId(id){ return (window.PRODUCTS || []).find(p => p.id === id); }

  function getId(){
    const url = new URL(location.href);
    return url.searchParams.get('id');
  }

  function renderProduct(product){
    if (!product) return;
    const media = document.getElementById('product-media');
    const name = document.getElementById('product-name');
    const price = document.getElementById('product-price');
    const desc = document.getElementById('product-description');
    const category = document.getElementById('product-category');
    const tags = document.getElementById('product-tags');

    if (media){ media.innerHTML = `<img src="${product.images?.[0] || ''}" alt="${product.name}">`; }
    if (name){ name.textContent = product.name; }
    if (price){ price.textContent = window.formatCurrency(product.price); }
    if (desc){ desc.textContent = product.description || ''; }
    if (category){ category.textContent = product.category; }
    if (tags){ tags.textContent = (product.tags || []).join(', '); }

    const size = document.getElementById('size');
    const color = document.getElementById('color');
    if (size){ size.innerHTML = (product.sizes || []).map(s => `<option value="${s}">${s}</option>`).join(''); }
    if (color){ color.innerHTML = (product.colors || []).map(c => `<option value="${c}">${c}</option>`).join(''); }

    const qty = document.getElementById('qty');
    document.getElementById('qty-inc')?.addEventListener('click', () => qty && (qty.value = String(Number(qty.value||1)+1)));
    document.getElementById('qty-dec')?.addEventListener('click', () => qty && (qty.value = String(Math.max(1, Number(qty.value||1)-1))));

    document.getElementById('add-to-cart')?.addEventListener('click', () => {
      const selected = {
        size: size && size.value || null,
        color: color && color.value || null
      };
      const quantity = qty ? Number(qty.value || 1) : 1;
      window.Cart.addItem(product, selected, quantity);
    });

    const related = (window.PRODUCTS || []).filter(p => p.category === product.category && p.id !== product.id).slice(0,4);
    window.renderProducts(related, 'related-grid');
    window.bindAddToCart('related-grid');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const id = getId();
    const product = byId(id);
    renderProduct(product);
  });
})();