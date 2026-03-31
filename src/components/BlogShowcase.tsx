import Link from 'next/link';
import { getLatestBlogPosts } from '@/lib/api/blog';

export default async function BlogShowcase() {
  const posts = await getLatestBlogPosts();

  return (
    <section className="nfx-blog-section">
      <div className="container">
        <h2 className="nfx-section-title reveal">Latest from the Blog</h2>
        <p className="nfx-section-sub reveal">Insights, tutorials, and thoughts on software development</p>
      </div>
      <div className="blog-carousel-container nfx-blog-carousel">
        <div className="blog-carousel-track" id="blog-carousel" style={{ display: 'flex', gap: '20px', padding: '20px 0', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
          {posts.map(post => (
            <div key={post.id} className="nfx-blog-card" style={{ scrollSnapAlign: 'start', minWidth: '300px' }}>
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
      </div>
      <div className="container" style={{ textAlign: "center", marginTop: "40px", paddingBottom: "60px" }}>
        <Link className="nfx-btn-red" href="/blog">
          View All Posts <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
