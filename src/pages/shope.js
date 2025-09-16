// shop.js - renders products and handles "Add to cart"
const products = [
  { id: 1, name: "Street Hub T-shirt", price: 1500, img: "./src/public/images/shirt1.jpg" },
  { id: 2, name: "Street Hub Cap", price: 800,  img: "./src/public/images/cap1.jpg" },
  { id: 3, name: "Oversized Hoodie", price: 2500, img: "./src/public/images/hoodie1.jpg" }
];

function formatPrice(n){ return "Ksh " + n.toFixed(0); }

function renderProducts(){
  const container = document.getElementById("products");
  if(!container) return;
  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placekitten.com/300/200'">
      <h3>${p.name}</h3>
      <p class="price">${formatPrice(p.price)}</p>
      <button data-id="${p.id}" class="add-btn">Add to Cart</button>
    </div>
  `).join("");
  // attach listeners
  container.querySelectorAll(".add-btn").forEach(b => {
    b.addEventListener("click", () => addToCart(Number(b.dataset.id)));
  });
}

function getCart(){ return JSON.parse(localStorage.getItem("mufasa_cart")||"[]"); }
function saveCart(c){ localStorage.setItem("mufasa_cart", JSON.stringify(c)); }

function addToCart(id){
  const prod = products.find(p=>p.id===id);
  if(!prod) return;
  const cart = getCart();
  const found = cart.find(i=>i.id===id);
  if(found) found.qty++;
  else cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
  saveCart(cart);
  alert(`${prod.name} added to cart`);
}

document.addEventListener("DOMContentLoaded", renderProducts);
