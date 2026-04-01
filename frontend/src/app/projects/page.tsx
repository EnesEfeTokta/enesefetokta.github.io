import { getProjects } from "@/lib/api/projects";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="container" style={{ paddingTop: "120px", paddingBottom: "60px", minHeight: "80vh" }}>
      <h1 className="nfx-section-title">All Projects</h1>
      <div className="nfx-marquee-wrap" style={{ marginTop: "40px", flexWrap: "wrap", justifyContent: "center", gap: "20px", display: "flex", animation: "none" }}>
        {projects.map(p => (
          <a key={p.id} href={p.link} className="nfx-project-card nfx-project-card-static" style={{ position: "relative", minWidth: "300px", maxWidth: "400px", margin: "0" }}>
            <div className="nfx-project-icon"><i className={p.icon}></i></div>
            <div className="nfx-project-content">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
