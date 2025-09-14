document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    body.classList.add('loading');

    // --- LOADING SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    const loaderText = document.getElementById('loader-text');
    const mainContent = document.getElementById('main-content');
    const textSequence = [
        "ESTABLISHING SECURE CONNECTION...",
        "AUTHENTICATING CREDENTIALS...",
        "ACCESSING MAIN FRAME...",
        "ACCESS GRANTED"
    ];

    let seqIndex = 0;
    const interval = setInterval(() => {
        if (loaderText) {
            loaderText.textContent = textSequence[seqIndex];
            seqIndex++;
            if (seqIndex === textSequence.length) {
                clearInterval(interval);
                setTimeout(init, 500);
            }
        }
    }, 1000);

    function init() {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    mainContent.style.display = 'block';
                }

                // All event listeners and observers are initialized here,
                // after the main content is visible.
                setupEventListeners();

                // Start hero animations after load
                typeWriter(document.getElementById('hero-title'), "NH Prince Pradhan");
            }, 500);
        }
    }

    // --- TYPEWRITER EFFECT ---
    function typeWriter(element, text, speed = 75) {
        let i = 0;
        if (!element) return;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function setupEventListeners() {
        // --- MOBILE NAVIGATION TOGGLE ---
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileNavToggle && navMenu) {
            mobileNavToggle.addEventListener('click', () => {
                const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
                mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
                mobileNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // --- FADE-IN ANIMATION ON SCROLL ---
        const sections = document.querySelectorAll('.content-section');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // --- ACTIVE NAV LINK HIGHLIGHTING ---
        const allSections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        allSections.forEach(section => navObserver.observe(section));

        // --- SMOOTH SCROLL ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // --- CONTACT FORM ---
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! (This is a demo form)');
                contactForm.reset();
            });
        }
    }
});
