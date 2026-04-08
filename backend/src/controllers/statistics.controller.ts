import { Request, Response } from "express";
import prisma from "../db/prisma";
import { createStatisticsSchema, updateStatisticsSchema } from "../schemas/statistics.schema";
import { getGitHubStatistics } from "../services/github.service";

export const getAllStatistics = async (req: Request, res: Response) => {
    try {
        const statistics = await prisma.statistics.findMany();
        res.json({ success: true, data: statistics.map(formatStatistics) });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
};

export const getStatisticsById = async (req: Request, res: Response) => {
    try {
        const stat = await prisma.statistics.findFirst({
            where: { id: req.params.id },
        });
        if (!stat) {
            return res.status(404).json({ error: "Statistics not found" });
        }
        res.json({ success: true, data: formatStatistics(stat) });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
};

export const createStatistics = async (req: Request, res: Response) => {
    try {
        const validation = createStatisticsSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: "Invalid data", details: validation.error.issues });
        }
        const data = validation.data;
        const newStat = await prisma.statistics.create({
            data: {
                socialMetrics: {
                    linkedIn: {
                        followers: data.socialMetrics.linkedIn.followers,
                        connections: data.socialMetrics.linkedIn.connections,
                    },
                    medium: {
                        views: data.socialMetrics.medium.views,
                        followers: data.socialMetrics.medium.followers,
                    },
                    youtube: {
                        subscribers: data.socialMetrics.youtube.subscribers,
                        views: data.socialMetrics.youtube.views,
                    },
                },
                universityMetrics: {
                    gpa: data.universityMetrics.gpa,
                },
            },
        });
        res.json({ success: true, data: formatStatistics(newStat) });
    } catch (error) {
        console.error("Error creating statistics:", error);
        res.status(500).json({ error: "Failed to create statistics" });
    }
};

export const updateStatistics = async (req: Request, res: Response) => {
    try {
        const validation = updateStatisticsSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: "Invalid data", details: validation.error.issues });
        }
        const data = validation.data;
        const updatedStat = await prisma.statistics.update({
            where: { id: req.params.id },
            data: {
                socialMetrics: data.socialMetrics ? {
                    linkedIn: {
                        followers: data.socialMetrics.linkedIn?.followers,
                        connections: data.socialMetrics.linkedIn?.connections,
                    },
                    medium: {
                        views: data.socialMetrics.medium?.views,
                        followers: data.socialMetrics.medium?.followers,
                    },
                    youtube: {
                        subscribers: data.socialMetrics.youtube?.subscribers,
                        views: data.socialMetrics.youtube?.views,
                    },
                } : undefined,
                universityMetrics: data.universityMetrics ? {
                    gpa: data.universityMetrics.gpa,
                } : undefined,
            },
        });
        res.json({ success: true, data: formatStatistics(updatedStat) });
    } catch (error) {
        console.error("Error updating statistics:", error);
        res.status(500).json({ error: "Failed to update statistics" });
    }
};

export const getStatisticsGitHubLatest = async (req: Request, res: Response) => {
    try {
        const stats = await getGitHubStatistics();
        if (!stats) {
            return res.status(404).json({ error: "GitHub statistics not found" });
        }
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error("Error fetching GitHub statistics:", error);
        res.status(500).json({ error: "Failed to fetch GitHub statistics" });
    }
};

const formatStatistics = (stat: any) => {
    return {
        id: stat.id,
        socialMetrics: {
            linkedIn: {
                followers: stat.linkedInFollowers,
                connections: stat.linkedInConnections,
            },
            medium: {
                views: stat.mediumViews,
                followers: stat.mediumFollowers,
            },
            youtube: {
                subscribers: stat.youtubeSubscribers,
                views: stat.youtubeViews,
            },
        },
        universityMetrics: {
            gpa: stat.gpa,
        }
    };
};