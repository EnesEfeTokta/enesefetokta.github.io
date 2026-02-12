// Blog Showcase Data and Rendering
const blogPosts = [
    {
        title: "Did Software Architectures Really Give Us an Advantage?",
        excerpt: "Exploring the balance between strict software architecture and customer satisfaction. Is 'Clean Code' slowing us down?",
        date: "Feb 2, 2026",
        readTime: "6 min",
        icon: "fa-project-diagram",
        link: "blog/posts/software-architecture-advantage.html",
        tags: ["Architecture", "Opinion"]
    },
    {
        title: "JWT: Is Security Really That Simple?",
        excerpt: "Deep dive into JWT security. Exploring vulnerabilities like the alg=none attack and stateless risks.",
        date: "Jan 29, 2026",
        readTime: "9 min",
        icon: "fa-shield-alt",
        link: "blog/posts/jwt-security-deep-dive.html",
        tags: ["Security", "Backend"]
    },
    {
        title: "Who Should We Listen to About AI?",
        excerpt: "A critical examination of AI narratives. Beyond corporate hype—why we should prioritize researchers over marketing.",
        date: "Jan 27, 2026",
        readTime: "7 min",
        icon: "fa-brain",
        link: "blog/posts/who-to-listen-ai.html",
        tags: ["AI", "Opinion"]
    },
    {
        title: "FinTrack: Lessons Learned While Building a Financial Backend",
        excerpt: "A reflection on building a financial tracking system with ASP.NET Core. Architectural decisions and engineering lessons.",
        date: "Jan 21, 2026",
        readTime: "10 min",
        icon: "fa-microsoft",
        link: "blog/posts/fintrack-lessons-learned.html",
        tags: [".NET", "Architecture"]
    },
    {
        title: "The Fear of Artificial Intelligence",
        excerpt: "A candid reflection on AI's impact on software careers from a student's perspective.",
        date: "Jan 16, 2026",
        readTime: "5 min",
        icon: "fa-brain",
        link: "blog/posts/ai-fear-perspective.html",
        tags: ["AI", "Career"]
    },
    {
        title: "Basic Helicopter Control System in Unity",
        excerpt: "Step-by-step guide to creating a physics-based helicopter control system in Unity with complete C# code examples.",
        date: "May 1, 2024",
        readTime: "9 min",
        icon: "fa-unity",
        link: "blog/posts/unity-helicopter-control.html",
        tags: ["Unity", "Tutorial"]
    }
];

function renderBlogCarousel() {
    const track = document.getElementById('blog-carousel');
    if (!track) return;

    const cards = blogPosts.map(post => `
        <a href="${post.link}" class="blog-carousel-card">
            <div class="blog-card-header-section">
                <i class="fas ${post.icon} blog-card-icon"></i>
            </div>
            <div class="blog-card-body">
                <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 0.85rem; color: var(--text-muted);">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <h3 style="font-size: 1.2rem; margin-bottom: 12px; line-height: 1.3; color: var(--text-main);">${post.title}</h3>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; font-size: 0.95rem;">
                    ${post.excerpt}
                </p>
                <div class="skill-tags">
                    ${post.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </a>
    `).join('');

    // Duplicate content for seamless infinite scroll
    track.innerHTML = cards + cards;
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBlogCarousel);
} else {
    renderBlogCarousel();
}
