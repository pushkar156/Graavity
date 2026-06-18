// Graavity Hospital JavaScript Actions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations using IntersectionObserver
    // Exclude the hero section (first-of-type) so above-the-fold content loads instantly
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

    document.querySelectorAll('section:not(:first-of-type)').forEach(section => {
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

    // 3. Header Scroll Transitions (Shrink height & add solid bg on scroll)
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    
    if (header && nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'bg-white/95');
                header.classList.remove('bg-surface/80');
                nav.classList.remove('h-20');
                nav.classList.add('h-16');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95');
                header.classList.add('bg-surface/80');
                nav.classList.remove('h-16');
                nav.classList.add('h-20');
            }
        });
    }

    // 4. ScrollSpy: Highlight active navigation links on scroll and update sliding indicator
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('nav-indicator');
    
    // We target each corresponding section: Hero (About), Specialities, Facilities, Doctors, Contact
    const targetSections = [
        document.querySelector('main > section:nth-of-type(1)'), // Hero (About)
        document.getElementById('specialities'),
        document.getElementById('facilities'),
        document.getElementById('doctors'),
        document.getElementById('contact')
    ];

    function activeMenu() {
        let currentSectionIdx = 0;
        const scrollPosition = window.scrollY + 120; // offset for nav bar height

        targetSections.forEach((section, index) => {
            if (section && scrollPosition >= section.offsetTop) {
                currentSectionIdx = index;
            }
        });

        let activeLink = null;
        navLinks.forEach((link, index) => {
            if (index === currentSectionIdx) {
                link.className = "nav-link text-secondary font-bold pb-1 transition-all duration-300 font-label-md text-label-md";
                activeLink = link;
            } else {
                link.className = "nav-link text-on-surface-variant dark:text-on-surface-variant hover:text-secondary transition-all duration-300 font-label-md text-label-md pb-1";
            }
        });

        if (navIndicator && activeLink) {
            navIndicator.style.left = `${activeLink.offsetLeft}px`;
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            navIndicator.style.opacity = '1';
        }
    }

    window.addEventListener('scroll', activeMenu);
    window.addEventListener('resize', activeMenu);
    
    // Wait slightly for fonts and styles to resolve initial widths perfectly
    setTimeout(activeMenu, 150);
});
