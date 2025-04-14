'use client';

import React, { useState, useEffect } from 'react';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Title } from '../../ui/title';

import { TBlog } from '@/types';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Blog list component
interface TBlogsProps {
  blogs: TBlog[];
}

export default function Blogs({ blogs }: TBlogsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="">
      <Title title1="Blogs" title2="My Blogs" />

      <motion.div
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8"
        initial="hidden"
        variants={containerVariants}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </motion.div>
    </div>
  );
}

// Blog card component
interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Extract and truncate blog title from content
  const getTitle = () => {
    if (blog.title) return blog.title;

    // Attempt to extract title from content if not directly available
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = blog.content;
    const h1 = tempDiv.querySelector('h1');

    return h1 ? h1.innerText : 'Untitled Blog Post';
  };

  // Create excerpt from content
  const getExcerpt = () => {
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = blog.content;
    const textContent = tempDiv.textContent || '';

    return (
      textContent.substring(0, 120) + (textContent.length > 120 ? '...' : '')
    );
  };

  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-default-100/50 rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl border border-default-100">
        {/* Image Container */}
        <div className="relative overflow-hidden h-24 md:h-48">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="h-full w-full"
            transition={{ duration: 0.4 }}
          >
            <Image
              alt={getTitle()}
              className="object-cover w-full h-full"
              height={500}
              src={blog.imageUrl}
              width={500}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-2 md:mb-4">
            <Avatar size="sm" src={blog.author.image} />
            <div className="ml-2">
              <p className="text-[10px] md:text-sm font-medium text-default7500">
                {blog.author.name}
              </p>
              <p className="text-[8px] md:text-xs text-default-500">
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>

          <h2 className="text-sm md:text-lg font-bold mb-1 md:mb-2 line-clamp-2 text-white">
            {getTitle()}
          </h2>

          <p className="text-default-600 text-[10px] md:text-sm mb-2 md:mb-4 line-clamp-3 flex-grow">
            {getExcerpt()}
          </p>

          <Link
            className="inline-flex items-center mt-auto text-xs md:text-sm font-medium text-warning-500 hover:text-warning-600 group"
            href={`/blogs/${blog._id}`}
          >
            Read more
            <motion.svg
              animate={{ x: isHovered ? 5 : 0 }}
              className="ml-1 size-3 md:size-4"
              fill="none"
              stroke="currentColor"
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Individual blog post view
export const BlogPost = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-default-100/50 rounded-xl overflow-hidden shadow-xl border border-default-100"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Image */}
      <div className="relative h-64 md:h-96 w-full">
        <Image
          alt="Blog header image"
          className="object-cover w-full h-full"
          height={1000}
          src={blog.imageUrl}
          width={2000}
        />

        {/* Date overlay */}
        <div className="absolute top-6 right-6 bg-default-100/50 bg-default-800 px-4 py-2 rounded-lg shadow-md">
          <p className="text-default-600 text-sm font-medium">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Author */}
        <div className="flex items-center mb-6 pb-6 border-b border-default-100 ">
          <Avatar size="lg" src={blog.author.image} />
          <div className="ml-4">
            <h3 className="text-lg font-bold text-white">{blog.author.name}</h3>
            <p className="text-default-500 text-sm">Author & Content Creator</p>
          </div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="blog-content"
          />
        </article>

        {/* Share/Like Section */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-default-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-default-500 hover:text-warning-500 transition-colors">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Share
            </button>
            <button className="flex items-center text-default-500 hover:text-red-500 transition-colors">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Like
            </button>
          </div>

          <Link
            className="text-warning-500 hover:text-warning-600 flex items-center"
            href="/blogs"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back to blogs
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
