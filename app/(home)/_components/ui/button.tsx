'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { IoDownload } from 'react-icons/io5';

interface AnimatedButtonProps {
  href: string;
  text: string;
  IconComponent?: React.ComponentType;
  target?: '_self' | '_blank';
  rel?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'glow';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  text,
  IconComponent = IoDownload,
  target = '_blank',
  rel = 'noopener noreferrer',
  size = 'md',
  variant = 'solid',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const textControls = useAnimation();
  const glowControls = useAnimation();

  // Set size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  // Set variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10';
      case 'glow':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      case 'solid':
      default:
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none';
    }
  };

  // Button variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 10,
      },
    },
  };

  // Icon variants
  const iconVariants = {
    initial: { y: 0, rotate: 0 },
    hover: {
      y: [0, -4, 0],
      rotate: [0, -10, 0, 10, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  // Text variants
  const textVariants = {
    initial: { x: 0 },
    hover: {
      x: [0, 2, 0, -2, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        repeatType: 'reverse' as 'reverse' | 'loop' | 'mirror',
        ease: 'easeInOut',
        delay: 0.2,
      },
    },
  };

  // Handle hover effects
  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start('hover');
    textControls.start('hover');

    // Animate glow for glow variant
    if (variant === 'glow') {
      glowControls.start({
        boxShadow: [
          '0 0 15px rgba(245,158,11,0.5)',
          '0 0 20px rgba(245,158,11,0.7)',
          '0 0 25px rgba(245,158,11,0.5)',
        ],
        transition: {
          repeat: Infinity,
          duration: 2,
          repeatType: 'reverse',
        },
      });
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start('initial');
    textControls.start('initial');

    if (variant === 'glow') {
      glowControls.start({
        boxShadow: '0 0 15px rgba(245,158,11,0.5)',
      });
    }
  };

  const handleTap = () => {
    controls.start('tap');
  };

  // Create particles on hover effect
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isHovered) {
      const newParticles = Array(8)
        .fill(0)
        .map((_, i) => {
          const size = Math.random() * 6 + 3;
          const xDirection = Math.random() > 0.5 ? 1 : -1;
          const x = (Math.random() * 30 + 10) * xDirection;
          const y = -Math.random() * 50 - 10;
          const duration = Math.random() * 0.8 + 0.6;

          return (
            <motion.div
              key={`particle-${i}`}
              animate={{
                x: x,
                y: y,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              className="absolute bg-yellow-300 rounded-full"
              style={{
                width: size,
                height: size,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              transition={{
                duration: duration,
                ease: 'easeOut',
                times: [0, 0.4, 1],
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          );
        });

      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  return (
    <div className="my-3 flex items-center justify-center">
      <motion.div
        animate={controls}
        className="relative"
        initial="initial"
        variants={buttonVariants}
        onHoverEnd={handleHoverEnd}
        onHoverStart={handleHoverStart}
        onTapStart={handleTap}
      >
        {/* The particles container */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          {particles}
        </div>

        {/* The button */}
        <motion.div
          animate={glowControls}
          className="rounded-full overflow-hidden"
        >
          <Link
            className={`flex items-center gap-2.5 rounded-full 
                      ${sizeClasses[size]} 
                      ${getVariantClasses()} 
                      font-semibold transition-all duration-300 relative overflow-hidden`}
            href={href}
            rel={rel}
            target={target}
          >
            {/* The shine effect */}
            {(variant === 'solid' || variant === 'glow') && (
              <motion.div
                animate={isHovered ? { left: '100%' } : { left: '-100%' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                style={{
                  width: '200%',
                  left: '-100%',
                  top: 0,
                  height: '100%',
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              />
            )}

            {/* Icon with animation */}
            <motion.span className="relative" variants={iconVariants}>
              {IconComponent && (
                <IconComponent
                  className={`${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl'}`}
                />
              )}
            </motion.span>

            {/* Text with animation */}
            <motion.span className="relative" variants={textVariants}>
              {text}
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedButton;
