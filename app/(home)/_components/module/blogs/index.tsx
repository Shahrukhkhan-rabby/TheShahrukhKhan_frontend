'use client';

import React from 'react';
import { Avatar } from '@nextui-org/avatar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Title } from '../../ui/title';

import { TBlog } from '@/types';

interface TBlogsProps {
  blogs: TBlog[];
}

const cardContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Blogs({ blogs }: TBlogsProps) {
  return (
    <div>
      <Title title1="Blogs" title2="My Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      animate="visible"
      className="bg-default-100/20 border border-default-100 rounded-lg p-6 relative h-auto md:h-[350px]"
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={cardContainerVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <div className="flex gap-3 items-center">
        <Avatar size="md" src={blog.author.image} />
        <div className="flex flex-col items-start">
          <h3 className="font-bold">{blog.author.name}</h3>
          <p className="text-xs text-default-500">
            Posted on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Image
        alt="Blog image"
        className="w-full md:w-[250px] h-auto my-2 rounded-lg"
        height={500}
        src={blog.imageUrl}
        width={500}
      />
      <div className="mt-5">
        <Link
          className="mt-4 font-semibold text-warning border-b border-warning hover:text-warning-600 text-xs"
          href={`/blogs/${blog?._id}`}
        >
          Read more
        </Link>
      </div>
    </motion.div>
  );
};
