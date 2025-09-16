// cart.js - renders cart, allows qty changes and removing
function getCart(){ return JSON.parse(localStorage.getItem("mufasa_cart")||"[]"); }
function saveCart(c){ localStorage.setItem("mufasa_cart", JSON.stringify(c)); }

function renderCart(){
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if(!list || !totalEl) return;

  const cart = getCart();
  if(cart.length === 0){
    list.innerHTML = "<li>Your cart is empty.</li>";
    totalEl.textContent = "Total: Ksh 0";
    return;
  }

  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong> - Ksh ${item.price} × ${item.qty}
      <div class="cart-controls">
        <button class="dec" data-id="${item.id}">-</button>
        <button class="inc" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    list.appendChild(li);
    total += item.price * item.qty;
  });
  totalEl.textContent = "Total: Ksh " + total;
  attachCartButtons();
}

function attachCartButtons(){
  document.querySelectorAll(".inc").forEach(b => b.onclick = () => changeQty(Number(b.dataset.id), 1));
  document.querySelectorAll(".dec").forEach(b => b.onclick = () => changeQty(Number(b.dataset.id), -1));
  document.querySelectorAll(".remove").forEach(b => b.onclick = () => removeItem(Number(b.dataset.id)));
}

function changeQty(id, delta){
  const cart = getCart();
  const idx = cart.findIndex(i=>i.id===id);
  if(idx === -1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
}

function removeItem(id){
  let cart = getCart();
  cart = cart.filter(i=>i.id !== id);
  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("clear-cart")?.addEventListener("click", () => {
    localStorage.removeItem("mufasa_cart");
    renderCart();
  });
});
