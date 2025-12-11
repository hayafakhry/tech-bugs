// Simple JavaScript for HayaTechBugs Portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('HayaTechBugs website loaded successfully! 🦋🧋');
    
    // Animate mini butterflies on hover
    const butterflies = document.querySelectorAll('.mini-butterfly');
    butterflies.forEach(butterfly => {
        butterfly.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.opacity = '1';
        });
        
        butterfly.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '0.7';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Archive item hover effect
    const archiveItems = document.querySelectorAll('.archive-item a');
    archiveItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.parentElement.style.backgroundColor = 'rgba(214, 188, 227, 0.1)';
            this.parentElement.style.paddingLeft = '10px';
            this.parentElement.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.parentElement.style.backgroundColor = '';
            this.parentElement.style.paddingLeft = '';
        });
    });
});
