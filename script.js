// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar.classList.contains('homepage-navbar')) {
        // Keep the background image and overlay on scroll for homepage
        navbar.style.background = '';
        navbar.style.boxShadow = (window.scrollY > 100) ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none';
    } else {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const inquiry = formData.get('inquiry');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    });
}

// Add hero contact form handling
const heroContactForm = document.getElementById('heroContactForm');
if (heroContactForm) {
    heroContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('heroName').value.trim();
        const contact = document.getElementById('heroContact').value.trim();
        const message = document.getElementById('heroMessage').value.trim();
        if (!contact) {
            showNotification('Please enter your email or phone number.', 'error');
            return;
        }
        showNotification('Thank you! We have received your request and will contact you soon.', 'success');
        this.reset();
    });
}

// View details buttons
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', function() {
        const propertyName = this.closest('.property-card').querySelector('h3').textContent;
        showNotification(`Loading details for ${propertyName}...`, 'info');
        // In a real application, this would open a modal or navigate to property details page
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.property-card, .agent-card, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Property filtering (example functionality)
function filterProperties(category) {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        const badge = card.querySelector('.property-badge').textContent;
        
        if (category === 'all' || badge.toLowerCase().includes(category.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add filter buttons if needed
function addFilterButtons() {
    const propertiesSection = document.querySelector('.properties .container');
    if (propertiesSection && !document.querySelector('.filter-buttons')) {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filter-buttons';
        filterButtons.innerHTML = `
            <button class="filter-btn active" onclick="filterProperties('all')">All</button>
            <button class="filter-btn" onclick="filterProperties('valley')">Valley View</button>
            <button class="filter-btn" onclick="filterProperties('forest')">Forest View</button>
            <button class="filter-btn" onclick="filterProperties('pine')">Pine View</button>
        `;
        
        // Insert after the h2
        const h2 = propertiesSection.querySelector('h2');
        h2.parentNode.insertBefore(filterButtons, h2.nextSibling);
        
        // Add styles for filter buttons
        const style = document.createElement('style');
        style.textContent = `
            .filter-buttons {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .filter-btn {
                padding: 0.5rem 1.5rem;
                border: 2px solid #2c5530;
                background: transparent;
                color: #2c5530;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .filter-btn:hover,
            .filter-btn.active {
                background: #2c5530;
                color: white;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Add click handlers for filter buttons
        filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Initialize filter buttons
document.addEventListener('DOMContentLoaded', addFilterButtons);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5530;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop); 

// Leaflet Map Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Initialize the map with English language
    const map = L.map('map', {
        language: 'en'
    }).setView([34.016218, 73.393053], 12); // Centered on Kuzagali exact coordinates

    // Add OpenStreetMap tiles with English labels
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?language=en', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Add a custom marker for Kuzagali (major landmark)
    const kuzaGaliMarker = L.marker([34.016218, 73.393053]).addTo(map);
    
    // Custom popup content for Kuza Gali
    const kuzaGaliPopup = `
        <div style="text-align: center; min-width: 200px;">
            <h3 style="color: #2c5530; margin: 0 0 10px 0;">🏔️ Kuza Gali</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> Major landmark in Galiyat Region, Pakistan</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Elevation:</strong> 8,000+ feet above sea level</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Distance from Islamabad:</strong> 80 kilometers</p>
            <div style="margin-top: 10px;">
                <span style="background: #2c5530; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px;">Major Landmark</span>
                <span style="background: #2c5530; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px;">Galiyat Region</span>
            </div>
        </div>
    `;
    
    kuzaGaliMarker.bindPopup(kuzaGaliPopup);

    // Add additional markers for nearby landmarks
    const landmarks = [
        {
            name: "Murree",
            coords: [33.9078, 73.3908],
            description: "Major hill station - 30 kilometers away"
        },
        {
            name: "Abbottabad",
            coords: [34.1463, 73.2116],
            description: "City center - 25 kilometers away"
        },
        {
            name: "Islamabad",
            coords: [33.6844, 73.0479],
            description: "Capital city - 80 kilometers away"
        },
        {
            name: "Islamabad International Airport",
            coords: [33.5491, 72.8258],
            description: "International Airport serving Islamabad"
        },
        {
            name: "Nathiagali",
            coords: [34.0724, 73.3810],
            description: "Popular hill station in Galiyat, 20 km from Pine Hill Enclave"
        }
    ];

    landmarks.forEach(landmark => {
        const marker = L.marker(landmark.coords).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center; min-width: 150px;">
                <h4 style="color: #2c5530; margin: 0 0 5px 0;">${landmark.name}</h4>
                <p style="margin: 0; font-size: 12px;">${landmark.description}</p>
            </div>
        `);
    });

    // Add a circle to show the approximate area around Kuzagali
    const kuzaGaliArea = L.circle([34.016218, 73.393053], {
        color: '#2c5530',
        fillColor: '#2c5530',
        fillOpacity: 0.1,
        radius: 500 // 500 meters radius
    }).addTo(map);

    // Add a polyline to show the route from Islamabad to Kuzagali
    const routeFromIslamabad = L.polyline([
        [33.6844, 73.0479], // Islamabad
        [34.016218, 73.393053]  // Kuzagali
    ], {
        color: '#2c5530',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    // Fit map to show all markers
    const group = new L.featureGroup([kuzaGaliMarker, ...landmarks.map(l => L.marker(l.coords))]);
    map.fitBounds(group.getBounds().pad(0.1));

    // Add zoom control
    map.zoomControl.setPosition('bottomright');
}); 