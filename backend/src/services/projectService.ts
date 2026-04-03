import { Project } from "../models/types";

export const getProjects = async (): Promise<Project[]> => {
  // Simulate DB delay
  return new Promise((resolve) => setTimeout(() => resolve([]), 300));
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
};
