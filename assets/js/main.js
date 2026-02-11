// Modern Professional Portfolio Scripts
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon Toggle
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuBtn && navLinks && !mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                if (navLinks) navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });
    });

    // Bento Grid Animation (Stagger Effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all animatable elements
    const animatedElements = document.querySelectorAll('.bento-item, .hero-text, .hero-image');

    animatedElements.forEach((el, index) => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'; // Apple ease

        // Add delay based on index for stagger (reset index for each section ideally, but global is fine for now)
        // el.style.transitionDelay = `${index % 5 * 0.1}s`; 

        observer.observe(el);
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid var(--border-active)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.borderBottom = '1px solid var(--border-subtle)';
        }
    });

    // Infinite Scroll Marquee Population
    const marqueeRow1 = document.getElementById('marquee-row-1');
    const marqueeRow2 = document.getElementById('marquee-row-2');

    if (marqueeRow1 && marqueeRow2 && typeof projectsData !== 'undefined') {
        const populateMarquee = (container, data) => {
            // Create cards
            const cards = data.map(project => {
                const linkPath = `pages/${project.link}`;
                return `
                    <a href="${linkPath}" class="marquee-card">
                        <div class="marquee-card-header">
                            <i class="${project.icon} marquee-icon"></i>
                            <span class="skill-tag" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); color: var(--text-secondary); text-transform: uppercase; font-size: 0.75rem; padding: 4px 10px;">${project.category}</span>
                        </div>
                        <h4 class="marquee-title">${project.title}</h4>
                        <p class="marquee-desc">${project.description}</p>
                        <div class="skill-tags">
                            ${project.tags.slice(0, 3).map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                        </div>
                    </a>
                `;
            }).join('');

            // Inject content - Duplicate for loop effect
            // We need enough copies to fill the screen width + buffer for smooth loop
            // For now, tripling the content is a safe bet for most screen sizes given the fixed card width
            container.innerHTML = cards + cards + cards + cards;
        };

        // Split data into two groups or just shuffle/reverse for variety
        // For row 1: Use first half or filtered list
        // For row 2: Use second half or reversed list

        // Let's just use all projects for both but in different order for visual variety
        const row1Data = [...projectsData];
        const row2Data = [...projectsData].reverse();

        populateMarquee(marqueeRow1, row1Data);
        populateMarquee(marqueeRow2, row2Data);
    }
});