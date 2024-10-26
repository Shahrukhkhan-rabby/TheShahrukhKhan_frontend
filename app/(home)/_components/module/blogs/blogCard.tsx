import React from 'react';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import { TBlog } from '@/types';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a DOMPurify instance for sanitizing HTML
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  // Find the indices of the first and second periods in the blog content
  const firstPeriodIndex = blog.content.indexOf('.');
  const secondPeriodIndex = blog.content.indexOf('.', firstPeriodIndex + 1);

  // Separate the title and remaining content based on the second period
  const title =
    secondPeriodIndex !== -1
      ? blog.content.slice(0, secondPeriodIndex + 1) // Get title up to the second period
      : blog.content.slice(0, 150); // Default to the first 150 characters if no second period
  const remainingContent =
    secondPeriodIndex !== -1
      ? blog.content.slice(secondPeriodIndex + 1) // Get content after the second period
      : blog.content.slice(150); // Default to content after 150 characters

  // Sanitize the title and remaining content before rendering
  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedContent = DOMPurify.sanitize(remainingContent);

  return (
    <div className="border border-default-200 rounded-lg p-6">
      {/* Author information */}
      <div className="flex gap-3 items-center">
        <Avatar size="md" src={blog.author.image} />
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold">{blog.author.name}</h3>
          <p className="text-sm text-default-500">
            Posted on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Title extracted from the content */}
      <div className="my-4">
        <p
          className="text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
        />
      </div>

      {/* Blog image */}
      <div className="my-3">
        <Image
          width={500}
          height={500}
          alt="Blog image"
          src={blog.imageUrl}
          className="w-full h-auto rounded-lg"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Full HTML Content */}
      <div
        className="blog-content my-4"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};
