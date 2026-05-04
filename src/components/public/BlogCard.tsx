import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { IBlogPost } from '@/types';
import { formatDate, truncate } from '@/lib/utils';

interface BlogCardProps {
  post: IBlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card overflow-hidden group">
      {post.image ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
      )}

      <div className="p-6">
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge bg-primary-50 text-primary-700">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-800 transition-colors leading-tight">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {truncate(post.excerpt, 120)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.publishedAt)}</span>
            )}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:gap-2 transition-all"
          >
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
