'use client';

import ReactMarkdown from 'react-markdown';

export default function BlogArticle({ content }: { content: string }) {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
