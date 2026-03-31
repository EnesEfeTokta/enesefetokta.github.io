export default function TechStack() {
  const skillCategories = [
    {
      title: "Languages", icon: "fas fa-code",
      tags: ["C#", "Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      title: "Backend", icon: "fas fa-server",
      tags: ["ASP.NET Core", "Web API", "MVC", "Entity Framework", "JWT Auth", "REST"]
    },
    {
      title: "Databases", icon: "fas fa-database",
      tags: ["PostgreSQL", "Redis", "SQLite", "Supabase"]
    },
    {
      title: "DevOps & Cloud", icon: "fas fa-cloud",
      tags: ["Docker", "GitHub Actions", "Azure", "AWS", "Prometheus", "Grafana"]
    },
    {
      title: "Game Dev", icon: "fab fa-unity",
      tags: ["Unity 3D", "Photon Fusion", "Physics", "MVVM", "Shader Graph"]
    },
    {
      title: "Frontend", icon: "fab fa-react",
      tags: ["React", "Next.js", "WPF", "HTML/CSS", "Vite"]
    }
  ];

  return (
    <section className="nfx-skills-section" id="skills">
      <div className="container">
        <h2 className="nfx-section-title reveal">Tech Stack</h2>
        <p className="nfx-section-sub reveal">Technologies and tools I work with daily</p>
        <div className="nfx-skills-grid reveal">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="nfx-skill-card">
              <div className="nfx-skill-card-header">
                <div className="nfx-skill-icon"><i className={cat.icon}></i></div>
                <h3>{cat.title}</h3>
              </div>
              <div className="nfx-skill-tags">
                {cat.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
