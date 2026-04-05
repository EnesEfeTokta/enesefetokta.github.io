import { Project } from "../models/types";

export const getProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([]), 300));
};
