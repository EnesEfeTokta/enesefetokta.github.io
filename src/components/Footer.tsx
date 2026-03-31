import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer nfx-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="footer-logo">Enes Efe Tokta</span>
            <p className="footer-tagline">
              Software Developer · .NET &amp; Unity · Based in Turkey.<br />
              Open to remote opportunities worldwide.
            </p>
          </div>
          <div className="footer-social">
            <a aria-label="GitHub" href="https://github.com/EnesEfeTokta" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/enes-efe-tokta-6567151b5/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a aria-label="Medium" href="https://medium.com/@EnesEfeTokta" target="_blank" rel="noopener noreferrer"><i className="fab fa-medium"></i></a>
            <a aria-label="X / Twitter" href="https://x.com/EnesEfeTokta" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Enes Efe Tokta. Built with modern web technologies.</p>
          <div className="footer-links">
            <Link href="/biography">Biography</Link>
            <Link href="/developer-stats">Stats</Link>
            <Link href="/future-plans">Future Plans</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/education">Education</Link>
            <Link href="/cv">Resume</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
