import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { Experience as ExperienceDTO } from '../models/types';
import { createExperienceSchema, updateExperienceSchema } from '../schemas/experience.schema';

export const getAllExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: 'desc' },
        });
        res.json({ success: true, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching experiences" });

    }
};

export const getExperienceById = async (req: Request, res: Response) => {
    try {
        const experience = await prisma.experience.findFirst({
            where: { id: req.params.id },
        });
        if (!experience) {
            return res.status(404).json({ success: false, message: "Experience not found" });
        }
        res.json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching experience" });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    try {
        const validation = createExperienceSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
        }
        const data: ExperienceDTO = req.body;
        const newExperience = await prisma.experience.create({
            data: {
                title: data.title,
                company: data.company,
                location: data.location,
                employmentType: data.employmentType,
                description: data.description,
                details: data.details,
                icon: data.icon,
                link: data.link,
                category: data.category,

                tags: data.tags.join(','),
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
            },
        });
        res.status(201).json({ success: true, data: newExperience });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating experience" });
    }
};

export const updateExperience = async (req: Request, res: Response) => {
    try {
        const validation = updateExperienceSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
        }
        const data: ExperienceDTO = req.body;
        const updatedExperience = await prisma.experience.update({
            where: { id: req.params.id },
            data: {
                title: data.title,
                company: data.company,
                location: data.location,
                employmentType: data.employmentType,
                description: data.description,
                details: data.details,
                icon: data.icon,
                link: data.link,
                category: data.category,

                tags: data.tags ? data.tags.join(',') : undefined,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
            },
        });
        res.json({ success: true, data: updatedExperience });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating experience" });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        await prisma.experience.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: "Experience deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting experience" });
    }
};