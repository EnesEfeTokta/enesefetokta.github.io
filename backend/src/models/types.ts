export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  category: "dotnet" | "unity" | "web";
}
