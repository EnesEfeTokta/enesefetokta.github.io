import { Request, Response } from "express";
import prisma from "../db/prisma";
import {
  createPersonalDevelopmentSchema,
  updatePersonalDevelopmentSchema,
} from "../schemas/personaldevelopment.schema";

export const getAllPersonalDevelopments = async (req: Request, res: Response) => {
  try {
    const personalDevelopments = await prisma.personalDevelopment.findMany({
      orderBy: { startDate: "desc" },
    });

    const formatted = personalDevelopments.map(formatPersonalDevelopment);
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching personal developments" });
  }
};

export const getPersonalDevelopmentById = async (req: Request, res: Response) => {
  try {
    const personalDevelopment = await prisma.personalDevelopment.findFirst({
      where: { id: req.params.id },
    });

    if (!personalDevelopment) {
      return res.status(404).json({ success: false, message: "Personal development not found" });
    }

    res.json({ success: true, data: formatPersonalDevelopment(personalDevelopment) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching personal development" });
  }
};

export const createPersonalDevelopment = async (req: Request, res: Response) => {
  try {
    const validation = createPersonalDevelopmentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const newPersonalDevelopment = await prisma.personalDevelopment.create({
      data: {
        title: data.title,
        provider: data.provider,
        description: data.description,
        icon: data.icon,
        modules: data.modules,
        certificateLink: data.certificateLink,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        category: data.category,
        tags: data.tags.join(","),
      },
    });

    res.status(201).json({ success: true, data: formatPersonalDevelopment(newPersonalDevelopment) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating personal development" });
  }
};

export const updatePersonalDevelopment = async (req: Request, res: Response) => {
  try {
    const validation = updatePersonalDevelopmentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const updatedPersonalDevelopment = await prisma.personalDevelopment.update({
      where: { id: req.params.id },
      data: {
        title: data.title,
        provider: data.provider,
        description: data.description,
        icon: data.icon,
        modules: data.modules,
        certificateLink: data.certificateLink,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        category: data.category,
        tags: data.tags ? data.tags.join(",") : undefined,
      },
    });

    res.json({ success: true, data: formatPersonalDevelopment(updatedPersonalDevelopment) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating personal development" });
  }
};

export const deletePersonalDevelopment = async (req: Request, res: Response) => {
  try {
    await prisma.personalDevelopment.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Personal development deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting personal development" });
  }
};

const formatPersonalDevelopment = (pd: any) => ({
  id: pd.id,
  title: pd.title,
  provider: pd.provider,
  description: pd.description,
  icon: pd.icon,
  modules: pd.modules,
  certificateLink: pd.certificateLink,
  startDate: pd.startDate.toISOString(),
  endDate: pd.endDate ? pd.endDate.toISOString() : null,
  category: pd.category,
  tags: typeof pd.tags === "string" ? pd.tags.split(",") : pd.tags,
});
