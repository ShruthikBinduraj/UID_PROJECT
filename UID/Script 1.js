function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (query.includes("levis")) {
      window.location.href = "levis-product.html";
    } else {
      alert("No results found for: " + query);
    }
  }
  
  function addToCart(productName, price, qty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price, quantity: qty });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
  }
  
  function viewCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItemsContainer');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
      cart.forEach((item, index) => {
        cartContainer.innerHTML += `
          <div class="my-2 d-flex justify-content-between align-items-center">
            <p class="mb-1"><strong>${item.name}</strong> - ₹${item.price} (Qty: ${item.quantity})</p>
            <button class="btn btn-sm btn-danger" onclick="deleteFromCart(${index})">Delete</button>
          </div>`;
      });
    }
    new bootstrap.Modal(document.getElementById('cartModal')).show();
  }
  
  function deleteFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
  }
  
  function initiatePayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    let cartDetails = '', totalAmount = 0;
    cart.forEach(item => {
      cartDetails += `<p><strong>${item.name}</strong> - ₹${item.price} (Qty: ${item.quantity})</p>`;
      totalAmount += parseInt(item.price.replace('₹', '').replace(',', '').trim()) * item.quantity;
    });
    document.getElementById('paymentMessage').innerHTML = `
      <h4>Thank you for your purchase!</h4>
      <p><strong>Items bought:</strong></p>
      ${cartDetails}
      <p><strong>Total Amount: ₹${totalAmount}</strong></p>
      <p>Your order will be processed soon.</p>`;
    localStorage.removeItem('cart');
  }
  
  function toggleLike(productName, btn) {
    let liked = JSON.parse(localStorage.getItem('liked')) || [];
    const index = liked.indexOf(productName);
    if (index > -1) {
      liked.splice(index, 1);
      btn.classList.remove('liked');
    } else {
      liked.push(productName);
      btn.classList.add('liked');
    }
    localStorage.setItem('liked', JSON.stringify(liked));
  }
  
  function showLiked() {
    const liked = JSON.parse(localStorage.getItem('liked')) || [];
    const container = document.getElementById('likedItemsContainer');
    container.innerHTML = liked.length === 0
      ? "<p>You haven't liked any products yet!</p>"
      : liked.map(item => `<p>❤ ${item}</p>`).join('');
    new bootstrap.Modal(document.getElementById('likedModal')).show();
  }
  function showImageModal(src) {
    const modalImg = document.getElementById("modalImage");
    modalImg.src = src;
    new bootstrap.Modal(document.getElementById("imageModal")).show();
  }
  