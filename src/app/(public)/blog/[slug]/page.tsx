import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { IBlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import CTASection from '@/components/public/CTASection';

async function getPost(slug: string): Promise<IBlogPost | null> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.isPublished) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-white">
        <div className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary-700 font-medium hover:text-primary-900 mb-8">
            <ArrowLeft size={14} /> Back to Insights
          </Link>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t) => (
                <span key={t} className="badge bg-primary-50 text-primary-700">
                  <Tag size={11} className="mr-1" /> {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-100">
            <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(post.publishedAt)}</span>
            )}
          </div>

          {post.image && (
            <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-10">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose-content text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      <CTASection />
    </>
  );
}
