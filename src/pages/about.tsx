import React from 'react';
import useSiteMetadata from 'hooks/useSiteMetadata';

export default function About() {
  const { title, description }: { title: string; description: string } = useSiteMetadata();

  return (
    <div>
      <h1>Welcome to {title}</h1>
      <p>About: {description}</p>
    </div>
  );
}
