import { BlogPost } from "@/types";

const mockPosts: BlogPost[] = [
  {
    id: "string-vs-stringbuilder",
    title: "The Silent Performance Killer in C#: String vs. StringBuilder",
    date: "March 24, 2026",
    category: "Performance",
    content: "Discover how string concatenation affects C# application performance and when exactly you should switch to StringBuilder.",
    link: "/blog/string-vs-stringbuilder"
  },
  {
    id: "api-re-design",
    title: "API Page Redesign",
    date: "March 19, 2026",
    category: "UI/UX",
    content: "A look into the redesign of the API documentation and key management pages for better developer experience.",
    link: "/blog/api-re-design"
  },
  {
    id: "backend-api-errors",
    title: "Fixing Backend API Errors",
    date: "March 30, 2026",
    category: "Debugging",
    content: "An deep dive into solving 500 Internal Server errors by investigating controller interactions and dependency injection configurations.",
    link: "/blog/backend-api-errors"
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
}

export async function getLatestBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, 3);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(p => p.id === slug);
}
