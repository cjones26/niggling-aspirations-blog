import React from 'react';
import { Link } from 'gatsby';

export interface IndexPostTemplateProps {
  post: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      date: string;
      tags: Array<string>;
    };
    excerpt: string;
  };
}

export default function HomePage({ post }: IndexPostTemplateProps) {
  const postTitle = post.frontmatter.title || post.fields.slug;

  return (
    <div className="mb-5">
      <div className="mb-3">{post.frontmatter.date.toLocaleUpperCase()}</div>
      <div className="flex justify-between">
        <h3 className="mt-0">
          <Link to={post.fields.slug}>{postTitle}</Link>
        </h3>
      </div>
      <p className="my-1">{post.excerpt}</p>
      <strong>Tags: </strong>
      <ul className="inline-block p-0 mt-2 mb-0 italic">{post.frontmatter.tags.join(', ')}</ul>
    </div>
  );
}
