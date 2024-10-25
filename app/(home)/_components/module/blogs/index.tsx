"use client";

import React, { useState } from "react";
import { Avatar } from "@nextui-org/avatar";

import { Title } from "../../ui/title";

import { TBlog } from "@/types";
import Image from "next/image";

interface TBlogsProps {
  blogs: TBlog[];
}

export default function Blogs({ blogs }: TBlogsProps) {
  return (
    <div>
      <Title title1="Blogs" title2="Blogs" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 ">
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
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="border border-default-200 rounded-lg p-6">
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
        className="w-full h-auto md:w-[250px] p-3 rounded"
        src={blog.imageUrl}
      />
      <div>
        {showDetails ? (
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="prose max-w-none"
          />
        ) : (
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blog.content.substring(0, 200)}...`,
              }}
            />
          </div>
        )}
        <button className="mt-4 font-semibold" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </div>
  );
};
