// Portfolio v2 — main.js
document.addEventListener('DOMContentLoaded', function () {

    // ==============================
    // MOBILE MENU TOGGLE
    // ==============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenuBtn && navLinks &&
            !mobileMenuBtn.contains(e.target) &&
            !navLinks.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    // Smooth scrolling remains...


    // ==============================
    // SMOOTH SCROLLING
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 68;
                window.scrollTo({
                    top: target.offsetTop - navbarHeight - 20,
                    behavior: 'smooth'
                });
                navLinks?.classList.remove('mobile-open');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });

    // ==============================
    // NAVBAR SCROLL EFFECT
    // ==============================
    const navbar = document.querySelector('.navbar');
    const handleNavScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
            navbar.style.boxShadow = 'none';
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ==============================
    // SCROLL REVEAL (IntersectionObserver)
    // ==============================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Animate .info-card and .skill-group on scroll
    const legacyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                legacyObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    document.querySelectorAll('.info-card, .skill-group').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.07}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.07}s`;
        legacyObserver.observe(el);
    });

    // ==============================
    // TYPING ANIMATION (Hero)
    // ==============================
    const typingEl = document.querySelector('.hero-typing-text');
    if (typingEl) {
        const phrases = [
            'Building scalable .NET backends.',
            'Crafting immersive Unity experiences.',
            'Designing clean software architectures.',
            'Turning ideas into running systems.',
            'Always learning. Always shipping.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const type = () => {
            const current = phrases[phraseIndex];

            if (!isDeleting) {
                typingEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isPaused = true;
                    setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2200);
                    return;
                }
            } else {
                typingEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }

            if (!isPaused) {
                const speed = isDeleting ? 38 : 72;
                setTimeout(type, speed);
            }
        };

        setTimeout(type, 800);
    }

    // ==============================
    // MARQUEE POPULATION (Projects)
    // ==============================
    const marqueeRow1 = document.getElementById('marquee-row-1');
    const marqueeRow2 = document.getElementById('marquee-row-2');

    if (marqueeRow1 && marqueeRow2 && typeof projectsData !== 'undefined') {
        const buildCard = (project) => {
            const linkPath = project.link.startsWith('http') ? project.link : `pages/${project.link}`;
            const githubLink = project.github || `https://github.com/EnesEfeTokta/${project.id}`;

            return `
                <div class="marquee-card">
                    <div class="marquee-card-logo">
                        <i class="${project.icon}"></i>
                    </div>
                    <div class="marquee-card-body">
                        <h4 class="marquee-title">${project.title}</h4>
                        <span class="marquee-cat">${project.category}</span>
                        <p class="marquee-desc">${project.description}</p>
                        <div class="marquee-card-actions">
                            <a href="${linkPath}" class="marquee-action-btn primary"><i class="fas fa-external-link-alt"></i> View</a>
                            <a href="${githubLink}" target="_blank" class="marquee-action-btn secondary"><i class="fab fa-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            `;
        };

        const row1Data = [...projectsData];
        const row2Data = [...projectsData].reverse();
        const cards1 = row1Data.map(buildCard).join('');
        const cards2 = row2Data.map(buildCard).join('');

        marqueeRow1.innerHTML = cards1 + cards1 + cards1 + cards1;
        marqueeRow2.innerHTML = cards2 + cards2 + cards2 + cards2;
    }
});