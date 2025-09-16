let cart = [];

// Load products from products.json
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const productsDiv = document.getElementById("products");
    products.forEach(product => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="150">
        <h3>${product.name}</h3>
        <p>KES ${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
      `;
      productsDiv.appendChild(item);
    });
  });

// Add to cart
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  displayCart();
}

// Display cart
function displayCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  cart.forEach((item, index) => {
    cartDiv.innerHTML += `<p>${item.name} - KES ${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartDiv.innerHTML += `<h3>Total: KES ${total}</h3>`;
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}
