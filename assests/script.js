// Dummy product list
const products = [
  { id: 1, name: "Cat Food", price: 10, image: "https://placekitten.com/200/200" },
  { id: 2, name: "Cat Toy", price: 5, image: "https://placekitten.com/201/200" },
  { id: 3, name: "Cat Bed", price: 20, image: "https://placekitten.com/200/201" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render products on homepage
if (document.getElementById("products")) {
  const productsDiv = document.getElementById("products");
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

// Add to cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const cartItem = cart.find(p => p.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}

// Render cart page
if (document.getElementById("cart-items")) {
  const cartItemsUl = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  function renderCart() {
    cartItemsUl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <div class="cart-controls">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      `;
      cartItemsUl.appendChild(li);
    });

    cartTotal.innerText = `Total: $${total}`;
  }

  window.changeQty = function (id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
}
