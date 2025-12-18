// Background Elements Creation
document.addEventListener('DOMContentLoaded', function() {
    // Create stars
    const starsContainer = document.getElementById('stars-container');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1px and 4px
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random blink duration
        const blinkDuration = Math.random() * 3 + 1;
        star.style.animationDuration = `${blinkDuration}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Create clouds
    const cloudsContainer = document.getElementById('clouds-container');
    const cloudCount = 10;
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        
        // Random size
        const width = Math.random() * 250 + 100;
        const height = width * 0.5;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${height}px`;
        
        // Random position
        const top = Math.random() * 80;
        cloud.style.top = `${top}%`;
        
        // Random horizontal start position
        const startPos = Math.random() * 100;
        cloud.style.left = `${startPos}%`;
        
        // Random opacity
        cloud.style.opacity = Math.random() * 0.3 + 0.4;
        
        // Create cloud shape with pseudo-elements
        const beforeSize = width * 0.6;
        const afterSize = width * 0.4;
        
        cloud.style.setProperty('--before-size', `${beforeSize}px`);
        cloud.style.setProperty('--after-size', `${afterSize}px`);
        
        // Random movement speed and direction
        const speed = Math.random() * 100 + 60;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const floatAnimation = `floatCloud ${speed}s linear infinite ${direction}`;
        cloud.style.animation = floatAnimation;
        
        // Add vertical movement
        const verticalMovement = Math.random() * 40 - 20;
        cloud.style.setProperty('--vertical-move', `${verticalMovement}px`);
        
        cloudsContainer.appendChild(cloud);
    }
    
    // Add CSS for cloud animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .cloud:before {
            content: '';
            position: absolute;
            width: var(--before-size, 120px);
            height: var(--before-size, 120px);
            top: -40px;
            left: 30px;
        }
        
        .cloud:after {
            content: '';
            position: absolute;
            width: var(--after-size, 80px);
            height: var(--after-size, 80px);
            top: -30px;
            right: 40px;
        }
        
        @keyframes floatCloud {
            0% { 
                transform: translateX(0) translateY(0); 
                opacity: 0.4;
            }
            25% { 
                transform: translateX(-25vw) translateY(var(--vertical-move, 10px)); 
                opacity: 0.7;
            }
            50% { 
                transform: translateX(-50vw) translateY(calc(-1 * var(--vertical-move, 10px))); 
                opacity: 0.5;
            }
            75% { 
                transform: translateX(-75vw) translateY(var(--vertical-move, 10px)); 
                opacity: 0.7;
            }
            100% { 
                transform: translateX(-100vw) translateY(0); 
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Table of Contents search functionality
    const tocSearchInput = document.querySelector('.toc-search-input');
    const tocItems = document.querySelectorAll('.toc-item');
    
    if (tocSearchInput) {
        tocSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            tocItems.forEach(item => {
                const title = item.querySelector('.toc-title').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Floating cards animation on scroll
    const floatingCards = document.querySelectorAll('.floating-card');
    
    function checkScroll() {
        floatingCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect();
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition.top < screenPosition) {
                card.style.animationPlayState = 'running';
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Update copyright year
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add hover effect to post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Email click tracking
    const emailLink = document.querySelector('.footer-email');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email link clicked:', this.href);
            // You could add analytics tracking here
        });
    }
});
