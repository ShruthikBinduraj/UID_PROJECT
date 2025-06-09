const products = [
  {
    id: 0,
    category: 'clothing',
    title: "Jordan Shoes",
    price: 4500,
    oldPrice: 5000,
    discount: 10,
    rating: "★★★★☆",
    image: "jordan.jpg",
    specs: ["Color: Red/Black", "Size: 9", "Material: Leather", "Brand: Jordan"],
    reviews: [
      "John Doe: Awesome shoes, very comfortable.",
      "Jane Smith: Looks great and fits well."
    ]
  },
  {
    id: 1,
    category: 'clothing',
    title: "Track Pants",
    price: 1200,
    oldPrice: 1500,
    discount: 20,
    rating: "★★★☆☆",
    image: "track.jpeg",
    specs: ["Material: Polyester", "Size: M, L, XL", "Brand: Puma"],
    reviews: [
      "John Doe: Very soft fabric.",
      "Jane Smith: Good for running."
    ]
  },
  {
    id: 2,
    category: 'clothing',
    title: "Denim Jacket",
    price: 2300,
    oldPrice: 2800,
    discount: 18,
    rating: "★★★★☆",
    image: "denim.jpg",
    specs: ["Fit: Regular", "Material: Denim", "Brand: Levi's"],
    reviews: [
      "John Doe: Classic denim look.",
      "Jane Smith: Warm and stylish."
    ]
  },
  {
    id: 3,
    category: 'clothing',
    title: "Running Shorts",
    price: 900,
    oldPrice: 1200,
    discount: 25,
    rating: "★★★☆☆",
    image: "shorts.jpg",
    specs: ["Material: Nylon", "Size: M, L", "Brand: Nike"],
    reviews: [
      "John Doe: Lightweight and breathable.",
      "Jane Smith: Nice for jogging."
    ]
  },
  {
    id: 4,
    category: 'homekitchen',
    title: "Dining Table",
    price: 15000,
    oldPrice: 18000,
    discount: 17,
    rating: "★★★★☆",
    image: "table.jpg",
    specs: ["Material: Wood", "Seats: 6", "Brand: HomeDeco"],
    reviews: [
      "John Doe: Solid build quality.",
      "Jane Smith: Perfect for my dining room."
    ]
  },
  {
    id: 5,
    category: 'homekitchen',
    title: "Sofa Set",
    price: 22000,
    oldPrice: 26000,
    discount: 15,
    rating: "★★★★☆",
    image: "sofa.jpg",
    specs: ["Material: Leather", "Seats: 3", "Brand: ComfortPlus"],
    reviews: [
      "John Doe: Very comfy and stylish.",
      "Jane Smith: Worth the price."
    ]
  },
  {
    id: 6,
    category: 'appliances',
    title: "Washing Machine",
    price: 12000,
    oldPrice: 13500,
    discount: 11,
    rating: "★★★★☆",
    image: "wash.jpeg",
    specs: ["Capacity: 7kg", "Type: Front Load", "Brand: LG"],
    reviews: [
      "John Doe: Cleans clothes well.",
      "Jane Smith: Quiet operation."
    ]
  },
  {
    id: 7,
    category: 'appliances',
    title: "Microwave Oven",
    price: 7000,
    oldPrice: 8500,
    discount: 18,
    rating: "★★★☆☆",
    image: "oven.jpg",
    specs: ["Power: 800W", "Capacity: 20L", "Brand: Samsung"],
    reviews: [
      "John Doe: Easy to use.",
      "Jane Smith: Heats food quickly."
    ]
  },
  {
    id: 8,
    category: 'grocery',
    title: "Rice Bag",
    price: 2000,
    oldPrice: 2200,
    discount: 9,
    rating: "★★★★★",
    image: "rice.jpg",
    specs: ["Weight: 10kg", "Type: Basmati", "Brand: Organic Farm"],
    reviews: [
      "John Doe: Good quality rice.",
      "Jane Smith: Tastes great."
    ]
  },
  {
    id: 9,
    category: 'grocery',
    title: "Wheat Bag",
    price: 1800,
    oldPrice: 2100,
    discount: 14,
    rating: "★★★★☆",
    image: "wheat.jpg",
    specs: ["Weight: 10kg", "Type: Whole Grain", "Brand: Healthy Harvest"],
    reviews: [
      "John Doe: Fresh wheat.",
      "Jane Smith: Good for making bread."
    ]
  }
];

let cart = [];
let likedProducts = new Set();
let currentProductIndex = 0;

function loadProduct(id, category) {
  const productIndex = products.findIndex(p => p.id === id && p.category === category);

  if (productIndex === -1) {
    console.error("Product not found with ID:", id, "and category:", category);
    return;
  }
  currentProductIndex = productIndex;
  const product = products[currentProductIndex];

  document.getElementById('mainProductImage').src = product.image;
  document.getElementById('productTitle').textContent = product.title;
 
  document.getElementById('productPrice').innerHTML = `₹${product.price.toLocaleString()} <span class="old-price text-muted">₹${product.oldPrice.toLocaleString()}</span> <span class="text-success">${product.discount}% OFF</span>`;
  
  document.getElementById('productRating').textContent = product.rating;

  const specsList = document.getElementById('productSpecs');
  specsList.innerHTML = '';
  product.specs.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsList.appendChild(li);
  });

  const reviewsDiv = document.getElementById('reviews');
  reviewsDiv.innerHTML = '';
  product.reviews.forEach(review => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${review.split(':')[0]}:</strong> ${review.split(':')[1]}`;
    reviewsDiv.appendChild(p);
  });

  document.getElementById('sizeSelect1').selectedIndex = 0;
  document.getElementById('qtySelect1').selectedIndex = 0;

  updateLikeButton(); 
  updateAddToCartButton();
}

function addToCart() {
  const product = products[currentProductIndex];
  const existingCartItem = cart.find(item => item.id === product.id);

  if (!existingCartItem) {
    cart.push({ ...product, quantity: 1 });
    alert(`${product.title} has been added to your cart.`);
  } else {
    alert(`${product.title} is already in your cart.`);
  }
  updateAddToCartButton();
}

function viewCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItemsDiv.textContent = "Your cart is empty.";
  } else {
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item-display', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'pb-2');
      div.innerHTML = `
        <span>${item.title} - ₹${item.price.toLocaleString()}</span>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

function removeFromCart(productId) {
  const productToRemove = products.find(p => p.id === productId);
  if (productToRemove) {
    cart = cart.filter(item => item.id !== productId);
    alert(`${productToRemove.title} removed from your cart.`);
    viewCart(); 
    updateAddToCartButton(); 
  }
}

function toggleProductLike() {
  const product = products[currentProductIndex];
  if (likedProducts.has(product.id)) {
    likedProducts.delete(product.id);
    alert(`${product.title} removed from your wishlist.`);
  } else {
    likedProducts.add(product.id);
    alert(`${product.title} added to your wishlist!`);
  }
  updateLikeButton(); 
  updateNavbarWishlistButton(); 
}



function updateLikeButton() {
  const likeBtn = document.getElementById('productLikeBtn');
  const product = products[currentProductIndex];
  if (likedProducts.has(product.id)) {
    likeBtn.classList.add('liked');
    likeBtn.textContent = '❤️ Liked'; 
  } else {
    likeBtn.classList.remove('liked');
    likeBtn.textContent = '❤️ Like';
  }
}

function updateNavbarWishlistButton() {
  const navbarWishlistBtn = document.getElementById('wishlistBtn');
  if (likedProducts.size > 0) {
    navbarWishlistBtn.classList.add('liked');
  } else {
    navbarWishlistBtn.classList.remove('liked');
  }
}

function updateAddToCartButton() {
  const product = products[currentProductIndex];
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (cart.find(item => item.id === product.id)) {
    addToCartBtn.textContent = "Added to Cart";
    addToCartBtn.disabled = true;
  } else {
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.disabled = false;
  }
}

function initiatePayment() {
  const messageDiv = document.getElementById('paymentMessage');
  if (cart.length === 0) {
    messageDiv.textContent = "Your cart is empty. Please add items before proceeding to payment.";
    messageDiv.classList.remove('alert-success');
    messageDiv.classList.add('alert-warning');
    messageDiv.style.display = "block";
    
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 3000);
    return;
  }
  messageDiv.classList.remove('alert-warning');
  messageDiv.classList.add('alert-success');
  messageDiv.textContent = "Payment process initiated. Thank you for your purchase!";
  messageDiv.style.display = "block";
  cart = []; 
  updateAddToCartButton(); 
  
  
  const modalEl = document.getElementById('cartModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
  
  
  viewCart(); 

  setTimeout(() => {
      messageDiv.style.display = "none";
  }, 3000);
}


function viewWishlist() {
  const wishlistItemsDiv = document.getElementById('wishlistItems');
  if (likedProducts.size === 0) {
    wishlistItemsDiv.textContent = "Your wishlist is empty.";
  } else {
    wishlistItemsDiv.innerHTML = '';
    likedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const div = document.createElement('div');
        div.classList.add('wishlist-item-display', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'pb-2');
        div.innerHTML = `
          <span>${product.title} - ₹${product.price.toLocaleString()}</span>
          <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${product.id})">Remove</button>
        `;
        wishlistItemsDiv.appendChild(div);
      }
    });
  }
  const wishlistModal = new bootstrap.Modal(document.getElementById('wishlistModal'));
  wishlistModal.show();
}


function removeFromWishlist(productId) {
    const productToRemove = products.find(p => p.id === productId);
    if (productToRemove) {
        likedProducts.delete(productId);
        alert(`${productToRemove.title} removed from your wishlist.`);
        viewWishlist(); 
        updateLikeButton(); 
        updateNavbarWishlistButton();
    }
}


function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm) {
    alert(`Searching for: "${searchTerm}". Search functionality is under development.`);
  } else {
    alert("Please enter a search term to find products.");
  }
}

window.onload = function() {
  loadProduct(0, 'clothing'); 
  updateNavbarWishlistButton(); 
}