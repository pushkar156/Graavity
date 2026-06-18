// Graavity Hospital JavaScript Actions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    // 2. Mobile Drawer Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    function openMobileMenu() {
        if (mobileMenuDrawer && mobileMenuOverlay) {
            mobileMenuDrawer.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeMobileMenu() {
        if (mobileMenuDrawer && mobileMenuOverlay) {
            mobileMenuDrawer.classList.add('translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});
