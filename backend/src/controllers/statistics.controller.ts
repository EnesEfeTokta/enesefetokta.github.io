import { Request, Response } from "express";
import prisma from "../db/prisma";
import { createStatisticsSchema, updateStatisticsSchema } from "../schemas/statistics.schema";

export const getAllStatistics = async (req: Request, res: Response) => {
  try {
    const statistics = await prisma.statistics.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = statistics.map(formatStatistics);
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching statistics" });
  }
};

export const getStatisticsById = async (req: Request, res: Response) => {
  try {
    const statistics = await prisma.statistics.findFirst({
      where: { id: req.params.id },
    });

    if (!statistics) {
      return res.status(404).json({ success: false, message: "Statistics not found" });
    }

    res.json({ success: true, data: formatStatistics(statistics) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching statistics" });
  }
};

export const createStatistics = async (req: Request, res: Response) => {
  try {
    const validation = createStatisticsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const newStatistics = await prisma.statistics.create({
      data: {
        socialMetrics: data.socialMetrics,
        universityMetrics: data.universityMetrics,
      },
    });

    res.status(201).json({ success: true, data: formatStatistics(newStatistics) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating statistics" });
  }
};

export const updateStatistics = async (req: Request, res: Response) => {
  try {
    const validation = updateStatisticsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const updatedStatistics = await prisma.statistics.update({
      where: { id: req.params.id },
      data: {
        socialMetrics: data.socialMetrics,
        universityMetrics: data.universityMetrics,
      },
    });

    res.json({ success: true, data: formatStatistics(updatedStatistics) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating statistics" });
  }
};

export const deleteStatistics = async (req: Request, res: Response) => {
  try {
    await prisma.statistics.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Statistics deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting statistics" });
  }
};

const formatStatistics = (statistics: any) => {
  return {
    id: statistics.id,
    socialMetrics: statistics.socialMetrics,
    universityMetrics: statistics.universityMetrics,
  };
};
