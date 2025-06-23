
// Animation Controller for CodeEX Club Website
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
        this.setupButtonAnimations();
        this.setupCardAnimations();
        this.setupTextAnimations();
    }

    // Scroll-based animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Fade in animation observer
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerFadeIn(entry.target);
                }
            });
        }, observerOptions);

        // Slide in animation observer
        const slideInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerSlideIn(entry.target);
                }
            });
        }, observerOptions);

        // Scale in animation observer
        const scaleInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScaleIn(entry.target);
                }
            });
        }, observerOptions);

        // Setup elements for observation
        this.observeElements('.scroll-fade-in', fadeInObserver);
        this.observeElements('.scroll-slide-left, .scroll-slide-right', slideInObserver);
        this.observeElements('.scroll-scale-in', scaleInObserver);

        // Auto-detect elements that need animation
        this.autoDetectAnimationElements();
    }

    observeElements(selector, observer) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            observer.observe(el);
        });
        this.observers.set(selector, observer);
    }

    autoDetectAnimationElements() {
        // Automatically add scroll animations to common elements
        const autoAnimateSelectors = [
            '.section-header',
            '.feature-card',
            '.module-card',
            '.event-card',
            '.project-card',
            '.resource-card',
            '.contact-item',
            '.benefit-item'
        ];

        autoAnimateSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.classList.add('scroll-fade-in');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    // Animation trigger methods
    triggerFadeIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('animate-fade-in');
    }

    triggerSlideIn(element) {
        if (element.classList.contains('scroll-slide-left')) {
            element.style.transform = 'translateX(0)';
        } else if (element.classList.contains('scroll-slide-right')) {
            element.style.transform = 'translateX(0)';
        }
        element.style.opacity = '1';
        element.classList.add('animate-slide-in');
    }

    triggerScaleIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        element.classList.add('animate-scale-in');
    }

    // Hover animations
    setupHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.feature-card, .module-card, .event-card, .project-card, .resource-card');
        cards.forEach(card => {
            this.addHoverEffect(card, 'lift');
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            this.addHoverEffect(btn, 'scale');
        });

        // Icon hover effects
        const icons = document.querySelectorAll('.feature-icon, .resource-icon, .contact-icon');
        icons.forEach(icon => {
            this.addHoverEffect(icon, 'rotate');
        });
    }

    addHoverEffect(element, type) {
        switch (type) {
            case 'lift':
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-10px)';
                    element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translateY(0)';
                    element.style.boxShadow = '';
                });
                break;
            case 'scale':
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'scale(1.05)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'scale(1)';
                });
                break;
            case 'rotate':
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'rotate(10deg) scale(1.1)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'rotate(0deg) scale(1)';
                });
                break;
        }
    }

    // Loading animations
    setupLoadingAnimations() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            this.animateLoadingScreen();
        }
    }

    animateLoadingScreen() {
        const loadingText = document.getElementById('loading-text');
        const progressFill = document.querySelector('.progress-fill');
        
        // Animate progress bar
        if (progressFill) {
            progressFill.style.animation = 'progress 3s ease-in-out forwards';
        }

        // Animate loading text
        if (loadingText) {
            const texts = [
                'Initializing CodeEX...',
                'Loading modules...',
                'Connecting to servers...',
                'Almost ready...',
                'Welcome to CodeEX!'
            ];
            
            let textIndex = 0;
            const textInterval = setInterval(() => {
                if (textIndex < texts.length) {
                    loadingText.textContent = texts[textIndex];
                    textIndex++;
                } else {
                    clearInterval(textInterval);
                }
            }, 600);
        }
    }

    // Button animations
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            this.addRippleEffect(btn);
        });

        // Pulse animation for CTA buttons
        const ctaButtons = document.querySelectorAll('.pulse-btn');
        ctaButtons.forEach(btn => {
            btn.classList.add('animate-pulse');
        });
    }

    addRippleEffect(button) {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Card animations
    setupCardAnimations() {
        this.setupProjectCardFilters();
        this.setupModuleTabAnimations();
        this.setupEventCardAnimations();
    }

    setupProjectCardFilters() {
        const filterButtons = document.querySelectorAll('.projects-section .filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.animateProjectFilter(projectCards, filter);
            });
        });
    }

    animateProjectFilter(cards, filter) {
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show card with animation
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                // Hide card with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setupModuleTabAnimations() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                this.animateTabSwitch(targetTab, tabPanels);
            });
        });
    }

    animateTabSwitch(targetTab, panels) {
        // Hide current active panel
        const currentPanel = document.querySelector('.tab-panel.active');
        if (currentPanel) {
            currentPanel.style.opacity = '0';
            currentPanel.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                currentPanel.classList.remove('active');
                
                // Show new panel
                const newPanel = document.getElementById(targetTab);
                if (newPanel) {
                    newPanel.classList.add('active');
                    newPanel.style.opacity = '0';
                    newPanel.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        newPanel.style.opacity = '1';
                        newPanel.style.transform = 'translateX(0)';
                    }, 50);
                }
            }, 300);
        }
    }

    setupEventCardAnimations() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach((card, index) => {
            // Stagger animation on load
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Text animations
    setupTextAnimations() {
        this.setupCounterAnimations();
        this.setupTypingAnimations();
        this.setupGlowAnimations();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    setupTypingAnimations() {
        const typingElements = document.querySelectorAll('.animate-typewriter');
        
        typingElements.forEach(element => {
            this.animateTyping(element);
        });
    }

    animateTyping(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }

    setupGlowAnimations() {
        const glowElements = document.querySelectorAll('.text-glow, .animate-glow');
        
        glowElements.forEach(element => {
            element.classList.add('animate-glow');
        });
    }

    // Performance optimizations
    enableGPUAcceleration(element) {
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform';
    }

    disableGPUAcceleration(element) {
        element.style.transform = '';
        element.style.willChange = 'auto';
    }

    // Cleanup method
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animations.clear();
    }
}

// Particle Animation System
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.animationId = null;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
            
            this.particles.push(particle);
            this.createParticleElement(particle, i);
        }
    }

    createParticleElement(particle, index) {
        const element = document.createElement('div');
        element.className = 'particle';
        element.id = `particle-${index}`;
        element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: ${particle.opacity};
            left: ${particle.x}px;
            top: ${particle.y}px;
            pointer-events: none;
        `;
        
        this.container.appendChild(element);
    }

    animate() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.container.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.container.offsetHeight) {
                particle.vy *= -1;
            }
            
            // Update element position
            const element = document.getElementById(`particle-${index}`);
            if (element) {
                element.style.left = `${particle.x}px`;
                element.style.top = `${particle.y}px`;
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.particles.forEach((_, index) => {
            const element = document.getElementById(`particle-${index}`);
            if (element) {
                element.remove();
            }
        });
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Initialize particle system for hero section
    const particleSystem = new ParticleSystem('particles-js');
    
    // Store references globally for cleanup if needed
    window.codeexAnimations = {
        controller: animationController,
        particles: particleSystem
    };
});

// Add CSS animations that weren't in the main CSS file
const additionalAnimationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particle {
        transition: none !important;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stagger-animation-1 { animation-delay: 0.1s; }
    .stagger-animation-2 { animation-delay: 0.2s; }
    .stagger-animation-3 { animation-delay: 0.3s; }
    .stagger-animation-4 { animation-delay: 0.4s; }
    .stagger-animation-5 { animation-delay: 0.5s; }
`;

// Add additional styles to document
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalAnimationStyles;
document.head.appendChild(additionalStyleSheet);

console.log('Animation system initialized successfully!');