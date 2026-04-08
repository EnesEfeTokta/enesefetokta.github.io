import { Octokit } from "octokit";
import prisma from "../db/prisma";
import { GitHubStatistics } from "../models/types";
import { object } from "zod";
import { th } from "zod/v4/locales";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = process.env.GITHUB_USERNAME || "enesefetokta";

export const syncGitHubData = async () => {
    try {
        console.log(`[GitHub Sync] Starting data sync for user: ${username}`);
        const [userRes, reposRes, followersRes, followingRes] = await Promise.all([
            octokit.request("GET /users/{username}", { username }),
            octokit.request("GET /users/{username}/repos", { username, per_page: 100 }),
        ]);

        const profile = userRes.data;
        const repos = reposRes.data;

        let totalStars = 0;
        let openIssues = 0;
        let closedIssues = 0;
        const languagesMap: Record<string, number> = {};

        for (const repo of repos) {
            totalStars += repo.stargazers_count || 0;
            openIssues += repo.open_issues_count || 0;
            closedIssues += 0; // GitHub API does not provide closed issues count directly in the repo object, so we will keep it as 0 for now

            if (repo.language) {
                languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            }
        }

        const totalBytes = Object.values(languagesMap).reduce((a, b) => a + b, 0);
        const languageDensity: Record<string, { bytes: number; percentage: number }> = {};

        for (const [language, bytes] of Object.entries(languagesMap)) {
            languageDensity[language] = {
                bytes,
                percentage: Number(((bytes / totalBytes) * 100).toFixed(2)),
            };
        }

        const newSnapshot = await prisma.gitHubSnapshot.create({
            data: {
                username: username,
                totalRepositories: repos.length,
                totalPullRequests: 0,
                totalCommits: 0,
                totalStars: totalStars,
                codeReviewsCount: 0,
                followersCount: profile.followers || 0,
                openIssuesCount: openIssues,
                closedIssuesCount: closedIssues,
                languageDensity: languageDensity as any,
                createdAt: new Date(),
            }
        });

        console.log(`[GitHub Sync] Data sync completed for user: ${username}. Snapshot ID: ${newSnapshot.id}`);
        return newSnapshot;
    } catch (error) {
        console.error(`[GitHub Sync] Error occurred while syncing data for ${username}:`, error);
    }
};

export const getGitHubStatistics = async (): Promise<GitHubStatistics | null> => {
    try {
        const latestSnapshot = await prisma.gitHubSnapshot.findFirst({
            where: { username },
            orderBy: { createdAt: "desc" },
        });

        if (!latestSnapshot) {
            console.warn(`[GitHub Stats] No GitHub snapshot found for user: ${username}`);
            return null;
        }

        const mappedStats: GitHubStatistics = {
            id: latestSnapshot.id,
            totalRepositories: latestSnapshot.totalRepositories,
            totalCommits: latestSnapshot.totalCommits,
            totalPullRequests: latestSnapshot.totalPullRequests,
            languageDensity: latestSnapshot.languageDensity as any as Record<string, { bytes: number; percentage: number }>,
            codeReviewsCount: latestSnapshot.codeReviewsCount,
            totalStars: latestSnapshot.totalStars,
            followersCount: latestSnapshot.followersCount,
            issues: {
                open: latestSnapshot.openIssuesCount,
                closed: latestSnapshot.closedIssuesCount,
            },
            createdAt: latestSnapshot.createdAt.toISOString(),
            updatedAt: latestSnapshot.createdAt.toISOString(),
        };
        console.log(`[GitHub Stats] Successfully retrieved GitHub statistics for user: ${username}`);
        return mappedStats;
    } catch (error) {
        console.error(`[GitHub Stats] Error occurred while fetching GitHub statistics for ${username}:`, error);
        return null;
    }
};