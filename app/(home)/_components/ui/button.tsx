'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { IoDownload } from 'react-icons/io5';

interface AnimatedButtonProps {
  href: string;
  text: string;
  IconComponent?: React.ComponentType;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  shadowColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  text,
  IconComponent = IoDownload,
  bgColor = 'bg-white',
  textColor = 'text-black',
  borderColor = 'border-default-200',
  shadowColor = 'shadow-md',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 1 } },
  };

  const pulseVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { scale: 1.5, opacity: 0 },
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start('hover');
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start('initial');
  };

  const handleTap = () => {
    controls.start('tap');
  };

  return (
    <div className="p-2 flex items-center justify-center">
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onTapStart={handleTap}
        className="relative"
      >
        <Link
          href={href}
          className={`flex items-center gap-2 border ${borderColor} rounded-full px-4 py-2 ${bgColor} ${textColor} font-medium ${shadowColor} hover:shadow-lg transition-shadow duration-300`}
        >
          <motion.span variants={iconVariants}>
            {IconComponent && <IconComponent className="text-xl" />}
          </motion.span>
          {text}
        </Link>
      </motion.div>
    </div>
  );
};

export default AnimatedButton;
