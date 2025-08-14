(function(){
  function formatCurrency(value){
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value); }
    catch { return `$${value.toFixed(2)}`; }
  }

  function updateYear(){
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function setupHeader(){
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('site-nav');
    if (hamburger && nav){
      hamburger.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
      });
    }
  }

  function setupNewsletter(){
    const form = document.getElementById('newsletter-form');
    const status = document.getElementById('newsletter-status');
    if (form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (status){ status.textContent = 'Thanks for subscribing!'; status.style.color = 'var(--success)'; }
        form.reset();
      });
    }
  }

  function setupContact(){
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    if (form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (status){ status.textContent = 'Message sent. We will get back to you soon.'; status.style.color = 'var(--success)'; }
        form.reset();
      });
    }
  }

  function createProductCard(product){
    const div = document.createElement('div');
    div.className = 'product-card';
    const image = (product.images && product.images[0]) || '';
    div.innerHTML = `
      <a class="media" href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${image}" alt="${product.name}">
      </a>
      <div class="info">
        <a class="name" href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
        <div class="meta">${product.category}</div>
        <div class="price">${formatCurrency(product.price)}</div>
        <div class="actions">
          <a class="btn btn-outline" href="product.html?id=${encodeURIComponent(product.id)}">View</a>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add</button>
        </div>
      </div>
    `;
    return div;
  }

  function renderProducts(products, container){
    const target = typeof container === 'string' ? document.getElementById(container) : container;
    if (!target) return;
    target.innerHTML = '';
    const fragment = document.createDocumentFragment();
    products.forEach(p => fragment.appendChild(createProductCard(p)));
    target.appendChild(fragment);
  }

  function bindAddToCart(container){
    const target = typeof container === 'string' ? document.getElementById(container) : container;
    if (!target) return;
    target.addEventListener('click', (e) => {
      const btn = e.target.closest && e.target.closest('.add-to-cart');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      const product = (window.PRODUCTS || []).find(p => p.id === id);
      if (!product) return;
      const size = product.sizes && product.sizes.length ? product.sizes[0] : null;
      const color = product.colors && product.colors.length ? product.colors[0] : null;
      window.Cart.addItem(product, { size, color }, 1);
      btn.textContent = 'Added';
      setTimeout(() => { btn.textContent = 'Add'; }, 900);
    });
  }

  window.formatCurrency = formatCurrency;
  window.createProductCard = createProductCard;
  window.renderProducts = renderProducts;
  window.bindAddToCart = bindAddToCart;

  document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    setupHeader();
    setupNewsletter();
    setupContact();
  });
})();