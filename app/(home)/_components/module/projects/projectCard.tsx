import { TProject } from '@/types';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../ui/button';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { TbFileDescription } from 'react-icons/tb';
import Link from 'next/link';

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

const techBadgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 0.1, // Stagger each badge animation
      duration: 0.3,
    },
  }),
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation of buttons
    },
  },
};

const buttonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function ProjectCard({ project }: { project: TProject }) {
  return (
    <motion.div
      className="bg-default-50 p-5 border border-default-100 relative rounded-md"
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="mb-10 relative overflow-hidden rounded">
        <Link href={`/project/${project._id}`}>
          <Image
            className="w-full md:h-[200px] object-cover rounded transition-transform duration-300"
            src={project?.images[0]}
            alt={project?.title}
            width={1000}
            height={1000}
          />
          {/* Hover effect for the image */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial="hidden"
            whileHover={{ opacity: 1 }}
          >
            <h2 className="text-white font-bold text-lg px-2 text-center">
              {project.title}
            </h2>
          </motion.div>
        </Link>
      </div>

      {/* Technology Badges */}
      <div className="flex flex-wrap justify-between gap-2 mb-4">
        {project.technologies.slice(0, 6).map((tech, index) => (
          <div key={index} className="">
            <Image
              src={tech.icon}
              alt="icon"
              width={1000}
              height={1000}
              className="size-8 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <motion.div
        className="flex items-center justify-between gap-3"
        variants={buttonContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={buttonVariants}>
          <AnimatedButton
            text="See Live"
            bgColor="bg-warning hover:bg-warning-500"
            textColor="text-gray-800 text-sm mt-5"
            href={project.live}
            IconComponent={AiOutlineFundProjectionScreen}
            target="_blank"
          />
        </motion.div>
        <motion.div variants={buttonVariants}>
          <AnimatedButton
            text="Details"
            bgColor="bg-transparent"
            borderColor="border-warning-500"
            textColor="text-[#F5A524] text-sm mt-5"
            href={`/project/${project._id}`}
            IconComponent={TbFileDescription}
            target="_self"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
