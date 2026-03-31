import { Project } from "@/types";

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
    id: "fintrack-desktop",
    title: "FinTrack Desktop",
    description: "WPF desktop client for the FinTrack ecosystem.",
    tags: ["WPF", "MVVM", "Sync"],
    icon: "fab fa-windows",
    link: "/projects/fintrack-desktop",
    category: "dotnet"
  },
  {
    id: "weather-zero",
    title: "Weather Zero+",
    description: "Modern weather dashboard application.",
    tags: ["WPF", "Supabase"],
    icon: "fas fa-cloud-sun",
    link: "/projects/weather-zero-plus",
    category: "dotnet"
  },
  {
    id: "atlas",
    title: "Atlas - Multiplayer Strategy",
    description: "A sci-fi multiplayer strategy game built with Photon Fusion. Two players compete on a planet, building bases and commanding air and ground units.",
    tags: ["Unity 3D", "C#", "Photon Fusion", "Multiplayer", "Low Poly"],
    icon: "fas fa-globe",
    link: "/projects/atlas-game",
    category: "unity"
  },
  {
    id: "fishing-game",
    title: "Fishing Game",
    description: "A fun spear throwing game about fishing in a lake. Features custom physics and dynamic spawning systems.",
    tags: ["Unity 3D", "C#", "Physics"],
    icon: "fas fa-fish",
    link: "/projects/fishing-game",
    category: "unity"
  },
  {
    id: "chunk-radar",
    title: "Chunk-Radar",
    description: "A modern flashcard application using the chunking method for English language learning. Built with React, TypeScript, and developed using the Vibe-Coding approach.",
    tags: ["React 18", "TypeScript", "Vite", "Express.js", "Vibe-Coding"],
    icon: "fas fa-language",
    link: "/projects/chunk-radar",
    category: "web"
  },
  {
    id: "habit-tracker-mcp",
    title: "Habit Tracker MCP",
    description: "An MCP server enabling AI assistants like Claude to track and analyze daily habits through natural conversation with local data storage.",
    tags: ["Node.js", "MCP", "AI", "LowDB"],
    icon: "fas fa-server",
    link: "/projects/habit-tracker-mcp",
    category: "web"
  },
  {
    id: "fertile-notify",
    title: "Fertile Notify",
    description: "An event-driven notification platform for centralized multi-channel notification management built with .NET 9 and Clean Architecture.",
    tags: [".NET 9", "Clean Architecture", "PostgreSQL", "Docker"],
    icon: "fas fa-bell",
    link: "/projects/fertile-notify",
    category: "dotnet"
  }
];

export async function getProjects(): Promise<Project[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 6);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(p => p.id === id);
}
