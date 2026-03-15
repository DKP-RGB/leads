// KASK Engineering - Main JS

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Animations
    const heroTl = gsap.timeline();
    heroTl.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5
    })
    .to('.hero-visual', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, "-=0.8");

    // Parallax effect for hero background
    gsap.to('.hero', {
        backgroundPositionY: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Fade Up Sections
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .footer-top');
    fadeElements.forEach(el => {
        // Skip header animation on products page
        if (window.location.pathname.includes('products.html') && el.classList.contains('section-header')) return;

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Staggered Animations for Grids (Home Page Only)
    if (document.querySelector('.services-grid')) {
        gsap.from('.services-grid .modern-service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: function () {
                gsap.set(this.targets(), { clearProps: "transform,opacity" });
            }
        });
    }

    // Reasons
    gsap.from('.reason-box', {
        scrollTrigger: {
            trigger: '.reasons-grid',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Industries
    gsap.from('.industry-item', {
        scrollTrigger: {
            trigger: '.industries-grid',
            start: 'top 85%'
        },
        opacity: 0,
        y: 30, // Slight upbeat
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // About Image Parallax
    gsap.to('.about-image img', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 50, // Parallax effect
        ease: 'none'
    });

    // Unified Testimonial Logic
    const unifiedCards = document.querySelectorAll('.u-testimonial-card');
    const unifiedControls = document.getElementById('unified-controls');

    if (unifiedCards.length > 0 && unifiedControls) {
        let activeIndex = 0;
        const intervalTime = 6000;
        let autoRotate;

        // Create Dots
        unifiedCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('control-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                setActiveUnifiedCard(index);
                resetAutoRotate();
            });
            unifiedControls.appendChild(dot);
        });

        const dots = document.querySelectorAll('.control-dot');

        function setActiveUnifiedCard(index) {
            // Update cards active state
            unifiedCards.forEach((card, i) => {
                if (i === index) {
                    card.classList.add('active');
                    card.classList.remove('inactive');
                } else {
                    card.classList.remove('active');
                    card.classList.add('inactive');
                }
            });

            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });

            activeIndex = index;
        }

        function startAutoRotate() {
            autoRotate = setInterval(() => {
                const nextIndex = (activeIndex + 1) % unifiedCards.length;
                setActiveUnifiedCard(nextIndex);
            }, intervalTime);
        }

        function resetAutoRotate() {
            clearInterval(autoRotate);
            startAutoRotate();
        }

        // Init
        startAutoRotate();
    }
});

// Theme Toggle Logic (Executed immediately since script is at the bottom of the body)
(function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;

    if (!themeToggleBtn) {
        console.error("Theme toggle button not found in DOM!");
        return;
    }

    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');

        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        if (themeIcon) {
            if (isLight) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    });
})();

// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Optional: Change icon (bars to xmark)
        const icon = mobileMenu.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = mobileMenu.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });
}
