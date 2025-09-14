// All JS is unchanged from the previous version, as the issue is CSS-related.
// For brevity, I'm not repeating the JS here, but assume it's the same as your last correct version.
document.addEventListener('DOMContentLoaded', () => {

    const typingElement = document.getElementById('typing-text');
    const texts = [
        "INITIATING_PROFILE_NH_PRINCE...",
        "ELITE_BUG_HUNTER_ONLINE...",
        "CYBER_SECURITY_SPECIALIST...",
        "SYSTEM_STATUS:_SECURE."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typingElement) return;
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 300;
        }
        setTimeout(typeWriter, typeSpeed);
    }
    if (typingElement) { typeWriter(); }


    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        if (!particlesContainer) return;

        particlesContainer.innerHTML = '';
        const particleCount = window.innerWidth < 768 ? 30 : 70;

        const particleChars = ['0', '1'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particleChars[Math.floor(Math.random() * particleChars.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

            const colors = [
                'var(--hacker-text-primary)',
                'var(--hacker-text-secondary)',
                'rgba(0, 255, 65, 0.5)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.color = randomColor;
            particle.style.textShadow = `0 0 5px ${randomColor}`;

            particlesContainer.appendChild(particle);
        }
    }
    if (particlesContainer) {
         createParticles();
         window.addEventListener('resize', createParticles);
    }

    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        const fadeInObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, fadeInObserverOptions);

        fadeInElements.forEach(el => {
            fadeInObserver.observe(el);
        });
    }

    const navLinksForScroll = document.querySelectorAll('a[href^="#"]');
    const navLinksContainer = document.getElementById('nav-links');
    const mobileMenuButton = document.getElementById('mobile-menu-btn');

    navLinksForScroll.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    if (mobileMenuButton) {
                        mobileMenuButton.classList.remove('active');
                    }
                }
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (mobileMenuButton && navLinksContainer) {
        mobileMenuButton.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }

    const parallaxElements = document.querySelectorAll('.floating-element');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach((element, index) => {
                const speed = 0.15 + (index * 0.03);
                const rotationFactor = 0.03;
                if(element) {
                    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * rotationFactor * (index % 2 === 0 ? 1 : -1)}deg)`;
                }
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('#nav-links a');

    if (sections.length > 0 && navAnchors.length > 0) {
        const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
        const sectionObserverOptions = {
            rootMargin: `-${headerOffset}px 0px -40% 0px`,
            threshold: 0.2
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navAnchors.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, sectionObserverOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
});
