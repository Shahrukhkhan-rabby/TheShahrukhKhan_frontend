'use client';

import React, { useState } from 'react';
import { Avatar } from '@nextui-org/avatar';

import { Title } from '../../ui/title';
import { motion } from 'framer-motion';

import { TBlog } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

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
      <Title title1="Blogs" title2="Blogs" />
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
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
      className="border border-default-200 rounded-lg p-6 relative h-auto md:h-[350px]"
    >
      <div className="flex gap-3 items-center">
        <Avatar size="md" src={blog.author.image} />
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold">{blog.author.name}</h3>
          <p className="text-sm text-default-500">
            Posted on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Image
        width={500}
        height={500}
        alt="Blog image"
        className="w-full md:w-[250px] h-auto my-2 rounded-lg"
        src={blog.imageUrl}
      />
      <div className="mt-5">
        <Link
          href={`/blogs/${blog?._id}`}
          className="mt-4 font-semibold text-warning border-b border-warning hover:text-warning-600"
        >
          Read more
        </Link>
      </div>
    </motion.div>
  );
};
