// checkout.js - fills the order textarea with cart summary
function getCart(){ return JSON.parse(localStorage.getItem("mufasa_cart")||"[]"); }

function buildOrderText(){
  const cart = getCart();
  if(cart.length === 0) return "Cart is empty.";
  let s = "";
  let total = 0;
  cart.forEach(it => {
    s += `${it.name} — qty: ${it.qty} — Ksh ${it.price} each\n`;
    total += it.price * it.qty;
  });
  s += `\nTotal: Ksh ${total}`;
  return { text: s, total };
}

document.addEventListener("DOMContentLoaded", () => {
  const details = document.getElementById("order-details");
  const totalInput = document.getElementById("order-total");
  const cart = getCart();
  const result = buildOrderText();
  if(details) details.value = result.text;
  if(totalInput) totalInput.value = result.total;

  // optional: clear cart after submit (we will listen for form submit)
  const form = document.getElementById("checkout-form");
  form?.addEventListener("submit", () => {
    // clear cart after short delay so Formspree still receives the payload
    setTimeout(() => { localStorage.removeItem("mufasa_cart"); }, 1000);
    // show message on submit page (Formspree might redirect)
  });
});
