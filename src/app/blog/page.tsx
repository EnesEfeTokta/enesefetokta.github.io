import { getBlogPosts } from "@/lib/api/blog";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <main className="container" style={{ paddingTop: "120px", paddingBottom: "60px", minHeight: "80vh" }}>
      <h1 className="nfx-section-title">Blog</h1>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", marginTop: "40px" }}>
        {posts.map(post => (
          <div key={post.id} className="nfx-blog-card">
            <div className="nfx-blog-meta">
              <span className="nfx-blog-cat">{post.category}</span>
              <span className="nfx-blog-date">{post.date}</span>
            </div>
            <h3 className="nfx-blog-title">
              <Link href={post.link}>{post.title}</Link>
            </h3>
            <p className="nfx-blog-excerpt">{post.content}</p>
            <Link className="nfx-blog-readmore" href={post.link}>
              Read Article <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
