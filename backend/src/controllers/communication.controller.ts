import { Request, Response } from "express";
import prisma from "../db/prisma";
import { createCommunicationSchema } from "../schemas/communication.schema";

export const getAllCommunications = async (req: Request, res: Response) => {
    try {
        const communications = await prisma.communication.findMany({
            orderBy: { createdAt: "desc" },
        });
        if (!communications) {
            return res.status(404).json({ success: false, message: "Communications not found" });
        }
        res.json({ success: true, data: formatCommunication(communications) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch communications" });
        console.error("Error fetching communications:", error);
    }
};

export const getAllCommunicationsByIsRead = async (req: Request, res: Response) => {
    try {
        const communications = await prisma.communication.findMany({
            where: { id: req.params.id },
            orderBy: { createdAt: "desc" },
        });
        if (!communications) {
            return res.status(404).json({ success: false, message: "Communications not found" });
        }
        res.json({ success: true, data: formatCommunication(communications) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch communications" });
        console.error("Error fetching communications:", error);
    }
};

export const createCommunication = async (req: Request, res: Response) => {
    try {
        const validation = createCommunicationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                errors: validation.error.issues,
            });
        }
        const data = validation.data;
        const newCommunication = await prisma.communication.create({
            data: {
                senderName: data.senderName,
                senderEmail: data.senderEmail,
                subject: data.subject,
                body: data.body,
            }
        });
        res.status(201).json({ success: true, data: formatCommunication(newCommunication) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating communication" });
    }
};

export const updateCommunicationReadById = async (req: Request, res: Response) => {
    try {
        const communication = await prisma.communication.findFirst({
            where: { id: req.params.id },
        });
        if (!communication) {
            return res.status(404).json({ success: false, message: "Communication not found" });
        }
        const updateCommunication = prisma.communication.update({
            where: { id: req.params.id },
            data: { isRead: true }
        });
        res.json({ success: true, data: updateCommunication });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ success: false, message: "Communication already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const formatCommunication = (communication: any) => ({
    id: communication.id,
    senderEmail: communication.senderEmail,
    senderName: communication.senderName,
    subject: communication.subject,
    body: communication.body,
    isRead: communication.isRead,
    createdAt: communication.createdAt,
});