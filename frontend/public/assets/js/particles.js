// Hero Particle Animation — Netflix Red/Black Theme
(function () {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST = 120;
    let mouse = { x: -1000, y: -1000 };
    let animId;

    function resize() {
        const hero = canvas.parentElement;
        w = canvas.width = hero.offsetWidth;
        h = canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            isRed: Math.random() < 0.3 // 30% chance of being red
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.15;
                    const isRedLine = particles[i].isRed || particles[j].isRed;
                    ctx.strokeStyle = isRedLine
                        ? `rgba(229, 9, 20, ${alpha})`
                        : `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw & update particles
        for (const p of particles) {
            // Mouse interaction — gentle repel
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 150) {
                p.vx += mdx * 0.0008;
                p.vy += mdy * 0.0008;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            // Clamp velocity
            p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
            p.vy = Math.max(-1.2, Math.min(1.2, p.vy));

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            if (p.isRed) {
                ctx.fillStyle = `rgba(229, 9, 20, ${p.opacity})`;
                ctx.shadowColor = 'rgba(229, 9, 20, 0.4)';
                ctx.shadowBlur = 8;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        animId = requestAnimationFrame(draw);
    }

    // Mouse tracking
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', () => {
        resize();
    });

    // Start
    init();
    draw();
})();
