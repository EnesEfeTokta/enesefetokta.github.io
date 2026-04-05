import { Request, Response } from "express";
import prisma from "../db/prisma";
import {
    createCertificationSchema,
    updateCertificationSchema,
} from "../schemas/certification.schema";

export const getAllCertifications = async (req: Request, res: Response) => {
    try {
        const certifications = await prisma.certification.findMany({
            orderBy: { issueDate: "desc" },
        });

        const formatted = certifications.map(formatCertification);
        res.json({ success: true, data: formatted });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching certifications" });
    }
};

export const getCertificationById = async (req: Request, res: Response) => {
    try {
        const certification = await prisma.certification.findFirst({
            where: { id: req.params.id },
        });

        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification not found" });
        }

        res.json({ success: true, data: formatCertification(certification) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching certification" });
    }
};

export const createCertification = async (req: Request, res: Response) => {
    try {
        const validation = createCertificationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                errors: validation.error.issues,
            });
        }

        const data = validation.data;
        const newCertification = await prisma.certification.create({
            data: {
                title: data.title,
                issuer: data.issuer,
                description: data.description,
                issueDate: new Date(data.issueDate),
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                credentialId: data.credentialId,
                link: data.link,
                icon: data.icon,
                category: data.category,
            },
        });

        res.status(201).json({ success: true, data: formatCertification(newCertification) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating certification" });
    }
};

export const updateCertification = async (req: Request, res: Response) => {
    try {
        const validation = updateCertificationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                errors: validation.error.issues,
            });
        }

        const data = validation.data;
        const updatedCertification = await prisma.certification.update({
            where: { id: req.params.id },
            data: {
                title: data.title,
                issuer: data.issuer,
                description: data.description,
                issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
                credentialId: data.credentialId,
                link: data.link,
                icon: data.icon,
                category: data.category,
            },
        });

        res.json({ success: true, data: formatCertification(updatedCertification) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating certification" });
    }
};

export const deleteCertification = async (req: Request, res: Response) => {
    try {
        await prisma.certification.delete({
            where: { id: req.params.id },
        });

        res.json({ success: true, message: "Certification deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting certification" });
    }
};

const formatCertification = (certification: any) => {
    return {
        id: certification.id,
        title: certification.title,
        issuer: certification.issuer,
        description: certification.description,
        issueDate: certification.issueDate.toISOString(),
        expiryDate: certification.expiryDate ? certification.expiryDate.toISOString() : null,
        credentialId: certification.credentialId,
        link: certification.link,
        icon: certification.icon,
        category: certification.category,
    };
};
