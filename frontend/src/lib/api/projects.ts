import { Project } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch projects");
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 6);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return undefined;
      throw new Error("Failed to fetch project");
    }
    
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return undefined;
  }
}
