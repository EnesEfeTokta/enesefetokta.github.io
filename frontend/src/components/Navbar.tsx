"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar nfx-navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container">
        <Link href="/" className="logo">Enes Efe Tokta</Link>
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`} id="nav-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/developer-stats">Stats</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/biography">Biography</Link></li>
          <li><Link href="/education">Education</Link></li>
          <li><Link href="/cv">Resume</Link></li>
          <li><Link href="/future-plans">Future Plans</Link></li>
          <li><Link href="/#contact" className="nav-cta nfx-nav-cta">Contact</Link></li>
        </ul>
        <button 
          aria-label="Toggle menu" 
          className="mobile-menu-btn" 
          id="mobile-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}
