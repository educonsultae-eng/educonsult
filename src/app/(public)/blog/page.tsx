import type { Metadata } from 'next';
import BlogCard from '@/components/public/BlogCard';
import { IBlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Insights & Blog',
  description: 'Expert insights on school improvement, KHDA inspections, curriculum development, and education leadership in the GCC.',
};

async function getPosts(): Promise<IBlogPost[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/blog`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom">
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Insights</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4">
            Expert Insights for GCC Educators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Practical guidance, thought leadership, and research-backed strategies from our team of education experts.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg mb-2">No articles yet.</p>
              <p className="text-sm">Check back soon for expert insights from our team.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
