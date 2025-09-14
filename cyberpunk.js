document.addEventListener('DOMContentLoaded', () => {

    // --- TEXT DECODING ANIMATION ---
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const originalTitle = "NH_PRINCE";
    const originalSubtitle = "CYBER SECURITY SPECIALIST & NETRUNNER";
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const decodeText = (element, originalText) => {
        let iterations = 0;
        const interval = setInterval(() => {
            element.textContent = originalText.split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index];
                    }
                    return randomChar();
                })
                .join("");

            if(iterations >= originalText.length){
                clearInterval(interval);
            }
            iterations += 1 / 2;
        }, 40);
    };

    setTimeout(() => {
        if(heroTitle) decodeText(heroTitle, originalTitle);
    }, 500);
    setTimeout(() => {
        if(heroSubtitle) decodeText(heroSubtitle, originalSubtitle);
    }, 1000);

    // --- GLITCH EFFECT ON NAV LINKS ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-logo a');
    navLinks.forEach(link => {
        link.dataset.text = link.textContent;
    });

    // --- SECTION TITLE GLITCH ON SCROLL ---
    const sectionTitles = document.querySelectorAll('.section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('glitch-effect');
                entry.target.dataset.text = entry.target.textContent;
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

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

});
