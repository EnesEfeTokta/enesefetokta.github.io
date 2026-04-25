import { Octokit } from "octokit";
import prisma from "../db/prisma";
import { GitHubStatistics } from "../models/types";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = process.env.GITHUB_USERNAME || "enesefetokta";

export const syncGitHubData = async () => {
    try {
        console.log(`[GitHub Sync] Veri çekme başladı: ${username}`);

        const [userRes, reposRes] = await Promise.all([
            octokit.request("GET /users/{username}", { username }),
            octokit.request("GET /users/{username}/repos", { username, per_page: 100 }),
        ]);

        const profile = userRes.data;
        const repos = reposRes.data;

        let totalStars = 0;
        let openIssues = 0;
        const languagesMap: Record<string, number> = {};

        for (const repo of repos) {
            totalStars += repo.stargazers_count || 0;
            openIssues += repo.open_issues_count || 0;

            if (repo.language) {
                languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            }
        }

        const totalRepoCountWithLanguage = Object.values(languagesMap).reduce((a, b) => a + b, 0);
        const languageDensity: Record<string, { bytes: number; percentage: number }> = {};

        if (totalRepoCountWithLanguage > 0) {
            for (const [language, count] of Object.entries(languagesMap)) {
                languageDensity[language] = {
                    bytes: count,
                    percentage: Number(((count / totalRepoCountWithLanguage) * 100).toFixed(2)),
                };
            }
        }

        const newSnapshot = await prisma.gitHubSnapshot.create({
            data: {
                username: username,
                totalRepositories: repos.length,
                totalPullRequests: 0, // İleride geliştirilecek
                totalCommits: 0,      // İleride geliştirilecek
                totalStars: totalStars,
                codeReviewsCount: 0,
                followersCount: profile.followers || 0,
                openIssuesCount: openIssues,
                closedIssuesCount: 0,
                languageDensity: languageDensity as any,
            },
        });

        return newSnapshot;
    } catch (error) {
        console.error(`[GitHub Sync] Hata:`, error);
        throw error;
    }
};

export const getGitHubStatistics = async (): Promise<GitHubStatistics | null> => {
    try {
        console.log("[GitHub Stats] En son snapshot verisi çekiliyor...");
        const snapshotCount = await prisma.gitHubSnapshot.count();
        console.log("Toplam Snapshot Sayısı:", snapshotCount);
        const latestSnapshot = await prisma.gitHubSnapshot.findFirst({
            orderBy: { createdAt: "desc" },
        });
        console.log("Bulunan Snapshot:", latestSnapshot);

        if (!latestSnapshot) return null;

        return {
            id: latestSnapshot.id,
            totalRepositories: latestSnapshot.totalRepositories,
            totalCommits: latestSnapshot.totalCommits,
            totalPullRequests: latestSnapshot.totalPullRequests,
            codeReviewsCount: latestSnapshot.codeReviewsCount,
            totalStars: latestSnapshot.totalStars,
            followersCount: latestSnapshot.followersCount,
            languageDensity: latestSnapshot.languageDensity as any,
            issues: {
                open: latestSnapshot.openIssuesCount,
                closed: latestSnapshot.closedIssuesCount,
            },
            createdAt: latestSnapshot.createdAt.toISOString(),
            updatedAt: latestSnapshot.createdAt.toISOString(),
        };
    } catch (error) {
        console.error(`[GitHub Stats] Get hatası:`, error);
        return null;
    }
};