'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaGithub, FaShare, FaRegBookmark } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedButton from '../../ui/button';

import ThumbnailSlider from './thumbnailSlider ';

import { TProject } from '@/types';

export default function ProjectDetails({ project }: { project: TProject }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 100) + 5
  );
  const [showTechInfo, setShowTechInfo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { images, title, description, technologies, live, github } = project;

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const techButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: '#f59e0b', color: '#ffffff' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      animate={isLoaded ? 'visible' : 'hidden'}
      className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      variants={pageVariants}
    >
      {/* Project Header */}
      <motion.div className="mb-10 relative" variants={containerVariants}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <motion.h1
              className="text-xl md:text-2xl font-bold text-warning mb-2"
              variants={fadeInUpVariants}
            >
              {title}
            </motion.h1>
            <motion.div
              className="flex items-center space-x-4 mb-6"
              variants={fadeInUpVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-default-700 border-2 border-default-800 overflow-hidden"
                  >
                    <Image
                      alt="Contributor"
                      className="w-full h-full object-cover"
                      height={32}
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      width={32}
                    />
                  </div>
                ))}
              </div>
              <span className="text-default-400 text-sm">+3 contributors</span>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center space-x-4"
            variants={fadeInUpVariants}
          >
            <button
              className="flex items-center space-x-1 text-default-500 hover:text-warning transition-colors"
              onClick={handleLikeToggle}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isLiked ? (
                  <AiFillHeart className="text-warning text-xl" />
                ) : (
                  <AiOutlineHeart className="text-xl" />
                )}
              </motion.div>
              <span>{likeCount}</span>
            </button>

            <motion.button
              className="flex items-center space-x-1 text-default-500 hover:text-warning transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaRegBookmark className="text-lg" />
              <span>Save</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-1 text-default-500 hover:text-warning transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShare className="text-lg" />
              <span>Share</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex flex-col lg:flex-row gap-10"
        variants={containerVariants}
      >
        {/* Left Side - Main Image and Thumbnails */}
        <motion.div
          className="lg:w-3/5 flex flex-col space-y-4"
          variants={containerVariants}
        >
          <motion.div
            animate="visible"
            className="relative rounded-xl overflow-hidden bg-default-800 shadow-2xl"
            initial="hidden"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                animate="visible"
                className="aspect-video relative"
                exit="exit"
                initial="hidden"
                variants={imageVariants}
              >
                <Image
                  fill
                  priority
                  alt={`${title} - image ${currentImageIndex + 1}`}
                  className="rounded-lg object-cover"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  src={images[currentImageIndex]}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-white font-medium">
                      Image {currentImageIndex + 1} of {images.length}
                    </span>
                    <div className="flex space-x-2">
                      <motion.button
                        aria-label="View full size"
                        className="bg-warning text-black p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AiOutlineEye size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <ThumbnailSlider
            currentImageIndex={currentImageIndex}
            handleImageChange={handleImageChange}
            images={images}
          />

          {/* Project Description */}
          <motion.div
            className="mt-6 bg-default-100/50 p-6 rounded-xl border border-default-100"
            variants={fadeInUpVariants}
          >
            <h2 className="text-xl font-bold mb-4 text-warning">
              Project Overview
            </h2>
            <p className="text-default-500 leading-relaxed mb-4">
              {description}
            </p>
            <p className="text-default-500 leading-relaxed">
              This project demonstrates advanced techniques in web development,
              incorporating responsive design principles and modern JavaScript
              frameworks to create a seamless user experience across all
              devices.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Project Details */}
        <motion.div className="lg:w-2/5" variants={containerVariants}>
          <motion.div
            className="bg-default-100/50 p-6 rounded-xl border border-default-100 sticky top-4"
            variants={fadeInUpVariants}
          >
            {/* Technologies Section */}
            <motion.div variants={fadeInUpVariants}>
              <h2 className="text-xl font-bold mb-4 text-warning">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech) => (
                  <motion.button
                    key={tech._id}
                    className="bg-default-500 hover:bg-warning hover:text-black text-default-800 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    initial="initial"
                    variants={techButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() =>
                      setShowTechInfo(
                        showTechInfo === tech._id ? null : tech._id
                      )
                    }
                  >
                    <Image
                      alt={tech.name}
                      className="w-5 h-5 rounded-full object-cover"
                      height={20}
                      src={tech.icon}
                      width={20}
                    />
                    {tech.name}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {showTechInfo && (
                  <motion.div
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden mb-6"
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                  >
                    <div className="bg-default-100/50 p-4 rounded-lg border border-default-100">
                      <h3 className="font-medium text-warning mb-2">
                        {technologies.find((t) => t._id === showTechInfo)?.name}
                      </h3>
                      <p className="text-sm text-default-500">
                        {technologies.find((t) => t._id === showTechInfo)
                          ?.category ||
                          'This technology was integral to the development of this project, providing essential functionality and performance benefits.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Features Section */}
            <motion.div className="mb-6" variants={fadeInUpVariants}>
              <h2 className="text-xl font-bold mb-4 text-warning">
                Key Features
              </h2>
              <ul className="space-y-3">
                {[
                  'Responsive Design',
                  'Real-time Updates',
                  'User Authentication',
                  'Data Visualization',
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className="text-warning mt-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-default-500">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Project Links */}
            <motion.div className="space-y-4" variants={fadeInUpVariants}>
              <h2 className="text-xl font-bold mb-4 text-warning">
                Project Links
              </h2>

              <motion.div
                className="grid grid-cols-1 gap-3"
                variants={containerVariants}
              >
                <AnimatedButton
                  IconComponent={AiOutlineEye}
                  href={live}
                  text="View Live Demo"
                />

                <AnimatedButton
                  IconComponent={FaGithub}
                  href={github.frontend}
                  text="Frontend Repository"
                />

                <AnimatedButton
                  IconComponent={FaGithub}
                  href={github.backend}
                  text="Backend Repository"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
