interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export interface Statistics extends BaseEntity {
  socialMetrics: {
    linkedIn: { followers: number; connections: number; };
    medium: { views: number; followers: number; };
    youtube: { subscribers: number; views: number; };
  };
  universityMetrics: {
    gpa: number;
  };
};

export interface GitHubStatistics extends BaseEntity {
  totalRepositories: number;
  totalCommits: number;
  totalPullRequests: number;
  languageDensity: Record<string, { bytes: number; percentage: number }>;
  codeReviewsCount: number;
  totalStars: number;
  followersCount: number;
  issues: { open: number; closed: number; };
};