// Blog Showcase Data and Rendering
const blogPosts = [
    {
        title: ".NET and C# in the AI Race: Not a Defeat, but a Strategic Positioning",
        excerpt: "Why C# lost ground to Python in AI isn't a story of failure — it's a story of strategic positioning, ecosystem timing, and complementary strengths.",
        date: "Mar 2, 2026",
        readTime: "4 min",
        icon: "fa-brain",
        link: "blog/posts/dotnet-csharp-ai-race.html",
        tags: [".NET", "AI", "Opinion"]
    },
    {
        title: "A .NET Developer’s Perspective on Node.js — And Why One Hand Should Be There Too",
        excerpt: "Why learning Node.js doesn't mean abandoning .NET, but expanding your perspective as an engineer. Exploring the bridge between .NET structure and Node.js velocity.",
        date: "Feb 15, 2026",
        readTime: "3 min",
        icon: "fa-node-js",
        link: "blog/posts/dotnet-perspective-on-nodejs.html",
        tags: [".NET", "Node.js", "TypeScript"]
    },
    {
        title: "Did Software Architectures Really Give Us an Advantage?",
        excerpt: "Exploring the balance between strict software architecture and customer satisfaction. Is 'Clean Code' slowing us down?",
        date: "Feb 2, 2026",
        readTime: "6 min",
        icon: "fa-project-diagram",
        link: "blog/posts/software-architecture-advantage.html",
        tags: ["Architecture", "Opinion", "Tech"]
    },
    {
        title: "JWT: Is Security Really That Simple?",
        excerpt: "Deep dive into JWT security. Exploring vulnerabilities like the alg=none attack and stateless risks.",
        date: "Jan 29, 2026",
        readTime: "9 min",
        icon: "fa-shield-alt",
        link: "blog/posts/jwt-security-deep-dive.html",
        tags: ["Security", "Backend", "Identity"]
    },
    {
        title: "Who Should We Listen to About AI?",
        excerpt: "A critical examination of AI narratives. Beyond corporate hype—why we should prioritize researchers over marketing.",
        date: "Jan 27, 2026",
        readTime: "7 min",
        icon: "fa-brain",
        link: "blog/posts/who-to-listen-ai.html",
        tags: ["AI", "Opinion", "Ethics"]
    },
    {
        title: "FinTrack: Lessons Learned While Building a Financial Backend",
        excerpt: "A reflection on building a financial tracking system with ASP.NET Core. Architectural decisions and engineering lessons.",
        date: "Jan 21, 2026",
        readTime: "10 min",
        icon: "fa-microsoft",
        link: "blog/posts/fintrack-lessons-learned.html",
        tags: [".NET", "Finance", "Backend"]
    },
    {
        title: "The Fear of Artificial Intelligence",
        excerpt: "A candid reflection on AI's impact on software careers from a student's perspective.",
        date: "Jan 16, 2026",
        readTime: "5 min",
        icon: "fa-brain",
        link: "blog/posts/ai-fear-perspective.html",
        tags: ["AI", "Career", "Mindset"]
    },
    {
        title: "Basic Helicopter Control System in Unity",
        excerpt: "Step-by-step guide to creating a physics-based helicopter control system in Unity with complete C# code examples.",
        date: "May 1, 2024",
        readTime: "9 min",
        icon: "fa-unity",
        link: "blog/posts/unity-helicopter-control.html",
        tags: ["Unity", "Tutorial", "Physics"]
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
                <div class="blog-card-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">
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
