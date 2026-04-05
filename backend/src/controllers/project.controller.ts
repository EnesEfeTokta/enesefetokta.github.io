import { Request, Response } from "express";
import prisma from "../db/prisma";
import { Project as ProjectDTO } from '../models/types';
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    const formatted = projects.map(p => ({
      ...p,
      startDate: p.startDate.toISOString(),
      endDate: p.endDate?.toISOString(),
      tags: typeof p.tags === 'string' ? p.tags.split(',') : p.tags,
      category: p.category as "dotnet" | "unity" | "web" | "mobile",
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProjectById = async (req: Request, res:Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id },
    });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const validation = createProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
    }
    const data: ProjectDTO = req.body;
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        details: data.details,
        icon: data.icon,
        image: data.image,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
        isFeatured: data.isFeatured,
        category: data.category,

        tags: data.tags.join(','),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    res.status(201).json({ success: true, data: newProject });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ success: false, message: "Project already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const validation = updateProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
    }
    const data: ProjectDTO = req.body;
    const updateProject = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        details: data.details,
        icon: data.icon,
        image: data.image,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
        isFeatured: data.isFeatured,
        category: data.category,

        tags: data.tags.join(','),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    res.json({ success: true, data: updateProject });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ success: false, message: "Project already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deleteProject = await prisma.project.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, data: deleteProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};