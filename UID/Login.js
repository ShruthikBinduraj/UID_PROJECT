// Like button functionality
document.getElementById('wishlistBtn').addEventListener('click', function() {
  this.classList.toggle('liked');
  if (this.classList.contains('liked')) {
    alert("Added to Wishlist!");
  }
});

function addToCart() {
  alert("Item added to Cart!");
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  // Show error messages when inputs are invalid
  function showValidationMessages() {
    if (!emailInput.validity.valid) {
      emailInput.nextElementSibling.style.display = 'block';
    } else {
      emailInput.nextElementSibling.style.display = 'none';
    }
    
    if (!passwordInput.validity.valid) {
      passwordInput.nextElementSibling.style.display = 'block';
    } else {
      passwordInput.nextElementSibling.style.display = 'none';
    }
  }
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (form.checkValidity()) {
      // Form is valid - show success modal
      document.getElementById('successModal').style.display = 'block';
    } else {
      showValidationMessages();
    }
  }, false);
  
  // Validate on input change
  emailInput.addEventListener('input', showValidationMessages);
  passwordInput.addEventListener('input', showValidationMessages);
});

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
}

function redirectToHome() {
  window.location.href = "Homepage.html";
  closeModal();
}