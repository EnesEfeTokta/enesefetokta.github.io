import { getBlogPostBySlug, getBlogPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";

// Generate static params for ISG
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="container" style={{ paddingTop: "120px", paddingBottom: "60px", minHeight: "80vh" }}>
      <span className="nfx-blog-cat">{post.category}</span>
      <h1 className="nfx-section-title" style={{ marginTop: "10px", textAlign: "left" }}>{post.title}</h1>
      <span className="nfx-blog-date">{post.date}</span>
      
      <div style={{ marginTop: "40px", lineHeight: "1.8", color: "var(--nfx-text)" }}>
        <p>{post.content}</p>
        <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <p><em>(Placeholder content. The full article body goes here. This data will be powered by the .NET API in the future.)</em></p>
        </div>
      </div>
    </main>
  );
}
