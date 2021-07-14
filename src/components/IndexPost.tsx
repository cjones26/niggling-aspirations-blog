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

  console.log('post: ', post);

  return (
    <div>
      <div>{post.frontmatter.date.toLocaleUpperCase()}</div>
      <Link to={post.fields.slug}>
        <h3>{postTitle}</h3>
      </Link>
      <p>{post.excerpt}</p>
      <ul className="italic">{post.frontmatter.tags.join(', ')}</ul>
      <hr />
    </div>
  );
}
