// Search functionality
function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value;
  if (searchTerm.trim()) {
    alert(`Searching for: ${searchTerm}`);
    // In a real application, you would perform the search here
  } else {
    alert('Please enter a search term');
  }
}

// Cart functionality
let cartItems = [];

function viewCart() {
  const cartModal = document.getElementById('cartModal');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
  } else {
    cartItemsContainer.innerHTML = cartItems.map(item => 
      `<div class="cart-item">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>`
    ).join('');
  }
  
  cartModal.style.display = 'block';
}

function initiatePayment() {
  alert('Proceeding to checkout...');
  // In a real application, you would redirect to payment page
  closeModal('cartModal');
}

// Wishlist functionality
let likedItems = [];

function showLiked() {
  const likedModal = document.getElementById('likedModal');
  const likedItemsContainer = document.getElementById('likedItemsContainer');
  
  if (likedItems.length === 0) {
    likedItemsContainer.innerHTML = '<p>You have no liked items</p>';
  } else {
    likedItemsContainer.innerHTML = likedItems.map(item => 
      `<div class="liked-item">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>`
    ).join('');
  }
  
  likedModal.style.display = 'block';
}

// Modal controls
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target.className === 'modal') {
    event.target.style.display = 'none';
  }
}

// Sample data for demonstration
document.addEventListener('DOMContentLoaded', function() {
  // Add some sample items to cart and liked items
  cartItems = [
    { name: 'Sample Product 1', price: 19.99 },
    { name: 'Sample Product 2', price: 29.99 }
  ];
  
  likedItems = [
    { name: 'Liked Product 1', price: 15.99 },
    { name: 'Liked Product 2', price: 25.99 }
  ];
});