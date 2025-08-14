(function(){
  function unique(arr){ return Array.from(new Set(arr)); }

  function getParams(){
    const url = new URL(location.href);
    return Object.fromEntries(url.searchParams.entries());
  }

  function populateFilters(){
    const categorySelect = document.getElementById('category');
    if (!categorySelect) return;
    const categories = ['all', ...unique(window.CATEGORIES || [])];
    categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function applyControls(){
    const params = getParams();
    const category = document.getElementById('category');
    const search = document.getElementById('search');
    const price = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    const sort = document.getElementById('sort');

    if (params.category && category){ category.value = params.category; }
    if (params.q && search){ search.value = params.q; }

    function onChange(){
      render();
    }

    [category, search, price, sort].forEach(el => el && el.addEventListener('input', onChange));
    [category, search, price, sort].forEach(el => el && el.addEventListener('change', onChange));

    if (price && priceValue){
      price.addEventListener('input', () => priceValue.textContent = price.value);
      priceValue.textContent = price.value;
    }
  }

  function filteredProducts(){
    const category = document.getElementById('category')?.value || 'all';
    const q = (document.getElementById('search')?.value || '').toLowerCase();
    const maxPrice = Number(document.getElementById('price')?.value || 500);
    const sort = document.getElementById('sort')?.value || 'featured';

    let list = (window.PRODUCTS || []).filter(p => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || (p.tags||[]).join(' ').toLowerCase().includes(q);
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesQuery && matchesPrice;
    });

    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    else if (sort === 'newest') list = list.reverse();

    return list;
  }

  function render(){
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const products = filteredProducts();
    window.renderProducts(products, grid);
    window.bindAddToCart(grid);
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    applyControls();
    render();
  });
})();