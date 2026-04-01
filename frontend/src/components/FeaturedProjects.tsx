import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/api/projects';

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="nfx-projects-section" id="work">
      <div className="container">
        <h2 className="nfx-section-title reveal">Featured Projects</h2>
        <p className="nfx-section-sub reveal">A curated selection of my latest work</p>
      </div>
      
      <div className="nfx-marquee-wrap">
        <div className="marquee-container">
          <div className="marquee-track scroll-left" id="marquee-row-1">
            {projects.slice(0, 3).map(p => (
              <a key={p.id} href={p.link} className="nfx-project-card">
                <div className="nfx-project-icon"><i className={p.icon}></i></div>
                <div className="nfx-project-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </a>
            ))}
            {/* Duplicating for CSS marquee seamless looping effect */}
            {projects.slice(0, 3).map(p => (
              <a key={`${p.id}-dup`} href={p.link} className="nfx-project-card">
                <div className="nfx-project-icon"><i className={p.icon}></i></div>
                <div className="nfx-project-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-track scroll-right" id="marquee-row-2">
            {projects.slice(3, 6).map(p => (
               <a key={p.id} href={p.link} className="nfx-project-card">
                 <div className="nfx-project-icon"><i className={p.icon}></i></div>
                 <div className="nfx-project-content">
                   <h3>{p.title}</h3>
                   <p>{p.description}</p>
                 </div>
               </a>
            ))}
            {projects.slice(3, 6).map(p => (
               <a key={`${p.id}-dup`} href={p.link} className="nfx-project-card">
                 <div className="nfx-project-icon"><i className={p.icon}></i></div>
                 <div className="nfx-project-content">
                   <h3>{p.title}</h3>
                   <p>{p.description}</p>
                 </div>
               </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container" style={{ textAlign: "center", padding: "40px 0 60px" }}>
        <Link className="nfx-btn-ghost" href="/projects">
          View All Projects <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
