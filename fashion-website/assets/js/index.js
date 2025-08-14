(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const featured = (window.PRODUCTS || []).filter(p => p.featured).slice(0, 8);
    if (featured.length && document.getElementById('featured-grid')){
      window.renderProducts(featured, 'featured-grid');
      window.bindAddToCart('featured-grid');
    }
  });
})();