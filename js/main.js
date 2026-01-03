cat > js/main.js << 'EOF'
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to Cart Functionality
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Add item to cart
        cart.push({
            name: productName,
            price: productPrice
        });
        
        // Visual feedback
        this.textContent = 'ADDED!';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = 'ADD TO CART';
            this.style.background = '';
        }, 1500);
        
        // Update cart count
        updateCartCount();
        
        console.log('Cart:', cart);
    });
});

// Update Cart Count
function updateCartCount() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.textContent = `🛒 CART (${cart.length})`;
}

// Scroll Animation for Product Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Search Bar Functionality
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 2rem';
        navbar.style.boxShadow = '0 4px 30px rgba(139, 61, 255, 0.5)';
    } else {
        navbar.style.padding = '1rem 2rem';
    }
    
    lastScroll = currentScroll;
});

// CTA Button Click
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.querySelector('.featured-section').scrollIntoView({
        behavior: 'smooth'
    });
});

console.log('graffiT Website Loaded Successfully! 🎨');
EOF
