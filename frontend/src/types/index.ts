export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  category: "dotnet" | "unity" | "web";
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string; // Brief description
  link: string;
}
