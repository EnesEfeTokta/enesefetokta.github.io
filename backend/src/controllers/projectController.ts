import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getProjects();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
