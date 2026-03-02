// About Me — Dynamic Vertical Carousel with Animated Counters
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.about-slide');
    const dots = document.querySelectorAll('.about-dot');
    const container = document.querySelector('.about-carousel-viewport');
    if (!container || slides.length === 0) return;

    let current = 0;
    let isAnimating = false;
    const total = slides.length;

    function goTo(idx) {
        if (isAnimating || idx === current || idx < 0 || idx >= total) return;
        isAnimating = true;

        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');

        current = idx;

        slides[current].classList.add('active');
        dots[current]?.classList.add('active');

        // Animate counters for this slide
        animateCounters(slides[current]);

        setTimeout(() => { isAnimating = false; }, 700);
    }

    // Mouse wheel navigation
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            goTo(current + 1);
        } else {
            goTo(current - 1);
        }
    }, { passive: false });

    // Touch swipe
    let touchStartY = 0;
    container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 50) {
            goTo(diff > 0 ? current + 1 : current - 1);
        }
    }, { passive: true });

    // Dot clicks
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });

    // Counter animation
    function animateCounters(slide) {
        const counters = slide.querySelectorAll('.counter-num');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                counter.textContent = count + suffix;
            }, 30);
        });
    }

    // Initial
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
    animateCounters(slides[0]);
});
