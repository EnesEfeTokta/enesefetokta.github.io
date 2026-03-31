import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="nfx-hero" id="home">
      <canvas className="nfx-particles-canvas" id="hero-particles"></canvas>
      <div className="nfx-hero-bg-glow"></div>
      <div className="container nfx-hero-inner">
        {/* Left: Text */}
        <div className="nfx-hero-left reveal">
          <span className="nfx-hero-badge"><i className="fas fa-code"></i> Open to Work</span>
          <h1 className="nfx-hero-heading">
            <span className="nfx-line1">Hello<span className="nfx-red">.</span></span>
            <span className="nfx-line2">I'm <strong>Enes Efe</strong></span>
            <span className="nfx-line3">Software Developer</span>
          </h1>
          <p className="nfx-hero-lead">
            Backend-Oriented Developer specializing in .NET Enterprise Solutions
            and Unity Game Development. Turning complex ideas into clean, scalable systems.
          </p>

          <div className="nfx-hero-ctas">
            <Link className="nfx-btn-red" href="#contact"><i className="fas fa-envelope"></i> Get In Touch</Link>
            <Link className="nfx-btn-ghost" href="/cv">My CV <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
        {/* Right: Photo */}
        <div className="nfx-hero-right reveal reveal-delay-2">
          <div className="nfx-photo-frame">
            <img alt="Enes Efe Tokta" className="nfx-photo" src="/assets/images/profile/my_profile.png" />
            <div className="nfx-photo-accent"></div>
          </div>
        </div>
      </div>
      
      {/* Platform row */}
      <div className="nfx-platforms reveal">
        <a className="nfx-platform" href="https://github.com/EnesEfeTokta" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
          <div><strong>GitHub</strong><span>See My Work</span></div>
        </a>
        <a className="nfx-platform" href="https://www.linkedin.com/in/enes-efe-tokta-6567151b5/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
          <div><strong>LinkedIn</strong><span>Connect</span></div>
        </a>
        <a className="nfx-platform" href="https://medium.com/@EnesEfeTokta" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-medium-m"></i>
          <div><strong>Medium</strong><span>Read Articles</span></div>
        </a>
      </div>

      {/* Dynamic Stats Row */}
      <div className="nfx-hero-stats reveal">
        <div className="nfx-stat">
          <span className="nfx-stat-val">29</span>
          <span className="nfx-stat-lbl">Repositories</span>
        </div>
        <div className="nfx-stat">
          <span className="nfx-stat-val">1,700+</span>
          <span className="nfx-stat-lbl">Commits</span>
        </div>
        <div className="nfx-stat">
          <span className="nfx-stat-val">225+</span>
          <span className="nfx-stat-lbl">Issues Solved</span>
        </div>
        <div className="nfx-stat">
          <span className="nfx-stat-val">10h</span>
          <span className="nfx-stat-lbl">Daily / Avg</span>
        </div>
      </div>
    </section>
  );
}
