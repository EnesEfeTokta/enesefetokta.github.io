"use client";

import { useState } from "react";

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Full-Stack Developer",
      icon: "fas fa-laptop-code",
      text: "I started my software journey with a deep curiosity for how systems work behind the scenes. This passion has led me to specialize in both robust .NET enterprise solutions and immersive Unity game development. I write clean code, build scalable architectures, and create impactful user experiences.",
      metrics: [
        { val: "9+", label: "Projects" },
        { val: "7+", label: "Blog Posts" },
        { val: "15+", label: "GitHub Repos" },
        { val: "5+", label: "Years Exp." },
      ]
    },
    {
      title: "Backend Engineering",
      icon: "fas fa-server",
      text: "My core strength lies in building enterprise-grade backend systems with ASP.NET Core. I design RESTful APIs with clean architecture, implement secure JWT authentication, leverage Entity Framework Core for data access, and deploy with Docker containers.",
      metrics: [
        { val: "5+", label: ".NET Projects" },
        { val: "12+", label: "REST APIs" },
        { val: "3", label: "Databases" },
        { val: "4+", label: "Years .NET" },
      ]
    },
    {
      title: "Game Development",
      icon: "fab fa-unity",
      text: "I bring ideas to life through immersive Unity games. From multiplayer strategy games with Photon Fusion to physics-based fishing simulations, I love the challenge of creating interactive experiences with custom mechanics, AI systems, and optimized rendering.",
      metrics: [
        { val: "2+", label: "Games Shipped" },
        { val: "3+", label: "Years Unity" },
        { val: "1", label: "Multiplayer" },
        { val: "5+", label: "Game Mech." },
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "fas fa-cloud",
      text: "I ensure applications are not just built, but deployed and monitored professionally. Experienced with Docker containerization, GitHub Actions CI/CD, Azure & AWS cloud services, and observability with Prometheus & Grafana for production-grade reliability.",
      metrics: [
        { val: "2", label: "Cloud Platforms" },
        { val: "5+", label: "Dockerized Apps" },
        { val: "3+", label: "CI/CD Pipes" },
        { val: "2", label: "Monitoring" },
      ]
    }
  ];

  return (
    <section className="nfx-about-section" id="about">
      <div className="container">
        <h2 className="nfx-section-title reveal">About Me</h2>
        <p className="nfx-section-sub reveal">Scroll down through my expertise areas</p>
      </div>
      <div className="about-carousel-viewport" style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
        {/* Dot Navigation */}
        <div className="about-dots" style={{ zIndex: 10 }}>
          {slides.map((_, idx) => (
            <button 
              key={idx}
              className={`about-dot ${activeSlide === idx ? 'active' : ''}`} 
              onClick={() => setActiveSlide(idx)}
              title={slides[idx].title}
            ></button>
          ))}
        </div>
        
        {/* Slides */}
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`about-slide ${activeSlide === idx ? 'active' : ''}`} 
            style={{ 
              opacity: activeSlide === idx ? 1 : 0, 
              visibility: activeSlide === idx ? 'visible' : 'hidden',
              transition: 'opacity 0.5s ease, visibility 0.5s ease',
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              display: 'flex', alignItems: 'center'
            }}
          >
            <div className="about-slide-inner container">
              <div className="about-slide-icon"><i className={slide.icon}></i></div>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
              <div className="about-metrics">
                {slide.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="about-metric">
                    <span className="counter-num">{metric.val}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
