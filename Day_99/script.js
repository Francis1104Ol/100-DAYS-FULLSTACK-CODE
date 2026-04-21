// =========================
// Product Class
// =========================
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  calculateTotal(taxRate) {
    return this.price + (this.price * taxRate);
  }
}

// =========================
// Product Data
// =========================
const products = [
  new Product(1, "Laptop", 250000),
  new Product(2, "Phone", 120000),
  new Product(3, "Headphones", 30000)
];

// =========================
// DOM Elements
// =========================
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart");
const totalDisplay = document.getElementById("total");

// =========================
// App State
// =========================
const cart = [];

// =========================
// Display Products
// =========================
function displayProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <span>${product.name} - ₦${product.price}</span>
      <button>Add to Cart</button>
    `;

    const button = div.querySelector("button");
    button.addEventListener("click", () => addToCart(product.id));

    productList.appendChild(div);
  });
}

// =========================
// Add to Cart
// =========================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// =========================
// Update Cart
// =========================
function updateCart() {
  cartList.innerHTML = "";

  let total = 0;
  const taxRate = 0.075;

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₦${item.price}
      <button>Remove</button>
    `;

    const removeBtn = li.querySelector("button");
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    cartList.appendChild(li);

    total += item.calculateTotal(taxRate);
  });

  totalDisplay.textContent = `Total (with tax): ₦${total.toFixed(2)}`;
}

// =========================
// Init
// =========================
displayProducts();