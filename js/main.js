// Import Supabase configuration
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://ocfpevuuijdmwvntccra.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZnBldnV1aWpkbXd2bnRjY3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MzY0MjIsImV4cCI6MjA4MzAxMjQyMn0.j91KQs6riEzRBmc_taJzIG6c-PetzJm4g820Gk47kMI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Cart Array
let cart = [];

// Fetch Products from Supabase
async function fetchProducts() {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*');
        
        if (error) throw error;
        
        console.log('Products loaded:', products);
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display Products on Page
function displayProducts(products) {
    const featuredGrid = document.querySelector('.featured-section .product-grid');
    const newArrivalsGrid = document.querySelector('.new-arrivals .product-grid');
    
    // Clear existing products
    if (featuredGrid) featuredGrid.innerHTML = '';
    if (newArrivalsGrid) newArrivalsGrid.innerHTML = '';
    
    // Split products: first 4 for featured, rest for new arrivals
    const featuredProducts = products.slice(0, 4);
    const newProducts = products.slice(4);
    
    // Display Featured Products
    featuredProducts.forEach(product => {
        if (featuredGrid) {
            featuredGrid.innerHTML += createProductCard(product);
        }
    });
    
    // Display New Arrivals
    newProducts.forEach(product => {
        if (newArrivalsGrid) {
            newArrivalsGrid.innerHTML += createProductCard(product);
        }
    });
    
    // Re-attach event listeners
    attachCartListeners();
}

// Create Product Card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image_url}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300/8B3DFF/FFFFFF?text=${encodeURIComponent(product.name)}'">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
            <button class="add-to-cart">ADD TO CART</button>
        </div>
    `;
}

// Attach Cart Event Listeners
function attachCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            cart.push({
                name: productName,
                price: productPrice
            });
            
            this.textContent = 'ADDED!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'ADD TO CART';
                this.style.background = '';
            }, 1500);
            
            updateCartCount();
            console.log('Cart:', cart);
        });
    });
}

// Update Cart Count
function updateCartCount() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.textContent = `🛒 CART (${cart.length})`;
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

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

// Search Functionality
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100 && navbar) {
        navbar.style.padding = '0.5rem 2rem';
        navbar.style.boxShadow = '0 4px 30px rgba(139, 61, 255, 0.5)';
    } else if (navbar) {
        navbar.style.padding = '1rem 2rem';
    }
});

// CTA Button
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const featuredSection = document.querySelector('.featured-section');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize - Fetch products when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('graffiT Website Loaded! 🎨');
    fetchProducts();
});
