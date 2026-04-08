interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  details: string;
  tags: string[];
  icon: string;
  image?: string;
  githubLink?: string;
  liveLink?: string;
  startDate: string;
  endDate?: string;
  isFeatured: boolean;
  category: "dotnet" | "unity" | "web" | "mobile";
}

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  category: "dotnet" | "unity" | "web" | "general" | "tutorial" | "opinion";
  authorId: string;
  isPublished: boolean;
}

export interface Experience extends BaseEntity {
  title: string;
  company: string;
  location: string;
  employmentType: "full-time" | "part-time" | "freelance" | "internship";
  description: string;
  details: string;
  tags: string[];
  icon: string;
  link?: string;
  startDate: string;
  endDate?: string;
  category: "work" | "education" | "volunteer";
}

export interface PersonalDevelopment extends BaseEntity {
  title: string;
  provider: string;
  description: string;
  tags: string[];
  icon: string;
  modules: {
    title: string;
    description?: string;
    isFinished: boolean;
    hours?: number;
  }[];
  certificateLink?: string;
  startDate: string;
  endDate?: string;
  category: "course" | "self-study" | "workshop" | "other";
}

export interface Certification extends BaseEntity {
  title: string;
  issuer: string;
  description: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link: string;
  icon: string;
  category: "professional" | "academic" | "other";
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: "admin" | "editor";
  avatar?: string;
}

export interface Statistics extends BaseEntity {
  socialMetrics: {
    linkedIn: { followers: number; connections: number; };
    medium: { views: number; followers: number; };
    youtube: { subscribers: number; views: number; };
  };
  universityMetrics: {
    gpa: number;
  };
}

export interface GitHubStatistics extends BaseEntity {
  totalRepositories: number;
  totalCommits: number;
  totalPullRequests: number;
  languageDensity: Record<string, { bytes: number; percentage: number }>;
  codeReviewsCount: number;
  totalStars: number;
  followersCount: number;
  issues: { open: number; closed: number; };
}