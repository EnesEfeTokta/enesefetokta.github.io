import { Project } from "../models/types";

// In a real application, this would fetch from a Postgres/SQL database
const mockProjects: Project[] = [
  {
    id: "vidsync",
    title: "VidSync",
    description: "AI-powered video meeting platform with real-time collaboration. Integrated with Mistral 7B AI model for meeting assistance.",
    tags: ["ASP.NET Core", "React", "WebRTC", "Docker"],
    icon: "fas fa-video",
    link: "/projects/vidsync",
    category: "dotnet"
  },
  {
    id: "fintrack-api",
    title: "FinTrack API",
    description: "Comprehensive financial management RESTful API. Features expense tracking, budget planning, and AI chatbot.",
    tags: ["REST API", "Entity Framework", "JWT Auth", "AI Integration"],
    icon: "fas fa-server",
    link: "/projects/fintrack-webapi",
    category: "dotnet"
  },
  {
    id: "atlas",
    title: "Atlas - Multiplayer Strategy",
    description: "A sci-fi multiplayer strategy game built with Photon Fusion.",
    tags: ["Unity 3D", "C#", "Photon Fusion", "Multiplayer", "Low Poly"],
    icon: "fas fa-globe",
    link: "/projects/atlas-game",
    category: "unity"
  }
];

export const getProjects = async (): Promise<Project[]> => {
  // Simulate DB delay
  return new Promise((resolve) => setTimeout(() => resolve(mockProjects), 300));
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
};
