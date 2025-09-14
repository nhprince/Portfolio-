document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation for content sections
    const contentSections = document.querySelectorAll('.content-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Typing animation for hero subtitle
    const subtitleElement = document.getElementById('hero-subtitle');
    const subtitles = [
        "Cyber Security Specialist",
        "Ethical Hacker",
        "Bug Bounty Hunter",
        "Penetration Tester"
    ];
    let subtitleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeSubtitle() {
        const currentSubtitle = subtitles[subtitleIndex];
        let typeSpeed = 100;

        if (isDeleting) {
            subtitleElement.textContent = currentSubtitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            subtitleElement.textContent = currentSubtitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentSubtitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        }

        setTimeout(typeSubtitle, typeSpeed);
    }

    if (subtitleElement) {
        typeSubtitle();
    }

});
