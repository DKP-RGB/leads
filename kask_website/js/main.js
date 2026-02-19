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
    });

    // Fade Up Sections
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .footer-top');
    fadeElements.forEach(el => {
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

    // Staggered Animations for Grids
    // Services
    gsap.from('.modern-service-card', {
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
