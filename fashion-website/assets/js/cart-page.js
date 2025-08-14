(function(){
  function render(){
    const container = document.getElementById('cart-items');
    if (!container) return;
    const items = window.Cart.loadCart();

    if (!items.length){
      container.innerHTML = '<p class="muted">Your cart is empty.</p>';
    } else {
      container.innerHTML = '';
      const fragment = document.createDocumentFragment();
      items.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="thumb"><img src="${item.image}" alt="${item.name}" /></div>
          <div>
            <h4>${item.name}</h4>
            <div class="line">${item.color || ''} ${item.size ? ' / ' + item.size : ''}</div>
            <div class="controls">
              <button class="btn" data-action="dec" data-index="${idx}">−</button>
              <input class="qty" data-index="${idx}" type="number" value="${item.qty}" min="1" style="width:64px;">
              <button class="btn" data-action="inc" data-index="${idx}">+</button>
              <button class="btn btn-outline" data-action="remove" data-index="${idx}">Remove</button>
            </div>
          </div>
          <div>${window.formatCurrency(item.price * item.qty)}</div>
        `;
        fragment.appendChild(row);
      });
      container.appendChild(fragment);
    }

    const shipping = items.length ? 8 : 0;
    const subtotal = window.Cart.subtotal();
    const total = subtotal + shipping;

    const subEl = document.getElementById('subtotal');
    const shipEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    if (subEl) subEl.textContent = window.formatCurrency(subtotal);
    if (shipEl) shipEl.textContent = window.formatCurrency(shipping);
    if (totalEl) totalEl.textContent = window.formatCurrency(total);
  }

  function bind(){
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const idx = Number(btn.getAttribute('data-index'));
      const action = btn.getAttribute('data-action');
      if (action === 'inc'){
        const items = window.Cart.loadCart();
        window.Cart.updateQuantity(idx, (items[idx].qty || 1) + 1);
        render();
      } else if (action === 'dec'){
        const items = window.Cart.loadCart();
        window.Cart.updateQuantity(idx, Math.max(1, (items[idx].qty || 1) - 1));
        render();
      } else if (action === 'remove'){
        window.Cart.removeItem(idx);
        render();
      }
    });

    container.addEventListener('change', (e) => {
      const input = e.target.closest('input.qty');
      if (!input) return;
      const idx = Number(input.getAttribute('data-index'));
      const value = Math.max(1, Number(input.value || 1));
      window.Cart.updateQuantity(idx, value);
      render();
    });

    const checkout = document.getElementById('checkout');
    if (checkout){
      checkout.addEventListener('click', () => {
        alert('This is a demo. Implement checkout with your preferred provider.');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => { bind(); render(); });
})();