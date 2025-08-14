(function(){
  const STORAGE_KEY = 'voguex_cart_v1';

  function loadCart(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }

  function saveCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount(){
    const count = countItems();
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = String(count));
  }

  function countItems(){
    const cart = loadCart();
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function addItem(product, options, qty){
    const quantity = Math.max(1, Number(qty || 1));
    const cart = loadCart();
    const keyMatches = (item) => item.id === product.id && item.size === options.size && item.color === options.color;
    const existing = cart.find(keyMatches);
    if (existing){
      existing.qty += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: (product.images && product.images[0]) || '',
        size: options.size || null,
        color: options.color || null,
        qty: quantity
      });
    }
    saveCart(cart);
  }

  function removeItem(index){
    const cart = loadCart();
    if (index >= 0 && index < cart.length){
      cart.splice(index, 1);
      saveCart(cart);
    }
  }

  function updateQuantity(index, qty){
    const cart = loadCart();
    if (cart[index]){
      cart[index].qty = Math.max(1, Number(qty || 1));
      saveCart(cart);
    }
  }

  function clear(){ saveCart([]); }

  function subtotal(){
    return loadCart().reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  window.Cart = { loadCart, saveCart, addItem, removeItem, updateQuantity, clear, countItems, subtotal, updateCartCount };

  window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) updateCartCount(); });
  document.addEventListener('DOMContentLoaded', updateCartCount);
})();