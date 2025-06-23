
// Global Variables
let currentTab = 'beginner';
let leaderboardData = [];
let filteredProjects = [];
let filteredResources = [];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const typedText = document.getElementById('typed-text');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after a delay
    setTimeout(() => {
        loadingScreen.classList.add('hide');
    }, 3000);

    // Initialize all components
    initializeNavigation();
    initializeTypedText();
    initializeParticles();
    initializeScrollAnimations();
    initializeCountdown();
    initializeModuleTabs();
    initializeProjectFilters();
    initializeResourceFilters();
    initializeLeaderboard();
    initializeFormHandlers();
    initializeStatCounters();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
}

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Typed Text Effect
function initializeTypedText() {
    const phrases = [
        'Code.',
        'Create.',
        'Collaborate.',
        'Innovate.',
        'Transform.'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Particles.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#39ff14'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#39ff14',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
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

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .section-header, .feature-card, .module-card, .event-card, .project-card, .resource-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Countdown Timer
function initializeCountdown() {
    // Set target date (July 15, 2024 for Hackion 2024)
    const targetDate = new Date('July 15, 2024 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Module Tabs
function initializeModuleTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            currentTab = targetTab;
        });
    });
}

// Project Filters
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.projects-section .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter project cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Resource Filters
function initializeResourceFilters() {
    const filterBtns = document.querySelectorAll('.resources-section .filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter resource cards
            resourceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Leaderboard initialization
function initializeLeaderboard() {
    // Sample leaderboard data
    leaderboardData = [
        { name: 'Aarav Sharma', score: 950, level: 'Advanced', projects: 8 },
        { name: 'Bhavya Patel', score: 920, level: 'Advanced', projects: 7 },
        { name: 'Chaitanya Reddy', score: 890, level: 'Intermediate', projects: 6 },
        { name: 'Diya Nair', score: 870, level: 'Intermediate', projects: 5 },
        { name: 'Eshaan Gupta', score: 850, level: 'Intermediate', projects: 5 },
        { name: 'Fiza Khan', score: 830, level: 'Intermediate', projects: 4 },
        { name: 'Gaurav Singh', score: 810, level: 'Intermediate', projects: 4 },
        { name: 'Hridya Menon', score: 790, level: 'Beginner', projects: 3 },
        { name: 'Ishaan Joshi', score: 770, level: 'Beginner', projects: 3 },
        { name: 'Jaya Rao', score: 750, level: 'Beginner', projects: 3 }
    ];
    
    populateLeaderboardTable();
    initializeLeaderboardSearch();
    initializeLeaderboardSort();
}

function populateLeaderboardTable() {
    const tbody = document.getElementById('leaderboard-tbody');
    tbody.innerHTML = '';
    
    leaderboardData.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.score}</td>
            <td><span class="level-badge level-${user.level.toLowerCase()}">${user.level}</span></td>
            <td>${user.projects}</td>
        `;
        row.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        row.style.opacity = '0';
        tbody.appendChild(row);
    });
}

function initializeLeaderboardSearch() {
    const searchInput = document.getElementById('search-leaderboard');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = leaderboardData.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        
        // Update table with filtered data
        const tbody = document.getElementById('leaderboard-tbody');
        tbody.innerHTML = '';
        
        filteredData.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leaderboardData.indexOf(user) + 1}</td>
                <td>${user.name}</td>
                <td>${user.score}</td>
                <td><span class="level-badge level-${user.level.toLowerCase()}">${user.level}</span></td>
                <td>${user.projects}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

function initializeLeaderboardSort() {
    const sortSelect = document.getElementById('sort-leaderboard');
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        
        if (sortBy === 'score') {
            leaderboardData.sort((a, b) => b.score - a.score);
        } else if (sortBy === 'name') {
            leaderboardData.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        populateLeaderboardTable();
    });
}

// Form Handlers
function initializeFormHandlers() {
    const joinForm = document.getElementById('join-form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', handleJoinFormSubmit);
    }
}

function handleJoinFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Welcome to CodeEX Club! Your application has been submitted successfully.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Stat Counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    // Intersection Observer for stat counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add resize handler for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// Add CSS for level badges
const levelBadgeStyles = `
    .level-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .level-beginner {
        background: #28a745;
        color: white;
    }
    .level-intermediate {
        background: #ffc107;
        color: #000;
    }
    .level-advanced {
        background: #dc3545;
        color: white;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = levelBadgeStyles;
document.head.appendChild(styleSheet);

console.log('CodeEX Club website initialized successfully!');