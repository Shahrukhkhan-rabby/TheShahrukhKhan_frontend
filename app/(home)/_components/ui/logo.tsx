'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const logoVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const containerVariants = {
  initial: { rotate: -5 },
  animate: {
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  whileHover: {
    rotate: [-1, 1, -1, 1, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const letterVariants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
  whileHover: (i: number) => ({
    y: [-3, 3, -2, 2, 0],
    scale: [1, 1.2, 0.9, 1.1, 1],
    rotate: [-5, 5, -3, 3, 0],
    color: ['#ffffff', '#FFD700', '#ffffff'],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 1],
      delay: i * 0.06,
    },
  }),
};

const bgPulseVariants = {
  initial: {
    background: 'linear-gradient(135deg, #FFA500 0%, #FF9B00 100%)',
  },
  animate: {
    background: [
      'linear-gradient(135deg, #FFA500 0%, #FF8B00 100%)',
      'linear-gradient(135deg, #FF8C00 0%, #FF7040 100%)',
      'linear-gradient(135deg, #FFA500 0%, #FF9B00 100%)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse' as 'reverse',
    },
  },
};

const nameVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
    },
  },
  whileHover: {
    textShadow: '0px 0px 8px rgba(255,170,0,0.5)',
    color: '#FF8C00',
    transition: {
      duration: 0.2,
    },
  },
};

export default function Logo() {
  const letters = 'MDSRK'.split('');
  const [isHovering, setIsHovering] = useState(false);
  const [sparkleElements, setSparkleElements] = useState<JSX.Element[]>([]);

  // Generate random sparkles when hovering
  useEffect(() => {
    if (isHovering) {
      const newSparkles = Array.from({ length: 12 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const startX = (Math.random() - 0.5) * 60;
        const startY = (Math.random() - 0.5) * 60;
        const duration = Math.random() * 0.8 + 0.6;

        return (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              x: startX + (Math.random() - 0.5) * 80,
              y: startY + (Math.random() - 0.5) * 80,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            className="absolute rounded-full bg-yellow-200"
            style={{
              width: size,
              height: size,
              x: startX,
              y: startY,
              opacity: 0,
            }}
            transition={{
              duration: duration,
              ease: 'easeOut',
              times: [0, 0.4, 1],
            }}
          />
        );
      });

      setSparkleElements(newSparkles);
    } else {
      setSparkleElements([]);
    }
  }, [isHovering]);

  return (
    <Link href="/">
      <motion.div
        animate="animate"
        className="flex items-center cursor-pointer relative"
        initial="initial"
        variants={logoVariants}
        whileHover="whileHover"
        onHoverEnd={() => setIsHovering(false)}
        onHoverStart={() => setIsHovering(true)}
      >
        <motion.div
          className="relative overflow-hidden flex items-center justify-center p-2 px-3 rounded-lg shadow-lg"
          variants={containerVariants}
        >
          {/* Animated background with pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            variants={bgPulseVariants}
          />

          {/* 3D rotating container */}
          <motion.div
            animate={
              isHovering
                ? {
                    rotateY: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                    },
                  }
                : {}
            }
            className="flex items-center relative z-10 perspective-50"
          >
            {letters.map((letter, index) => (
              <motion.div
                key={index}
                className="relative mx-0.5"
                custom={index}
                variants={letterVariants}
              >
                {/* Letter shadow */}
                <p
                  className="absolute text-black opacity-20 font-bold text-[18px] m-0 blur-[1px]"
                  style={{
                    transform: 'translateY(2px) translateX(2px)',
                  }}
                >
                  {letter}
                </p>

                {/* Main letter */}
                <p
                  className="text-white font-bold text-[18px] m-0"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {letter}
                </p>

                {/* Sparkle container */}
                {isHovering &&
                  index ===
                    letters.indexOf(
                      letters[Math.floor(Math.random() * letters.length)]
                    ) && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                      {sparkleElements}
                    </div>
                  )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Name part with its own animation */}
        <motion.div className="relative ml-3" variants={nameVariants}>
          <p className="font-semibold hidden xs:block text-lg md:text-xl">
            Shahrukh
          </p>

          {/* Underline animation */}
          <motion.div
            animate={isHovering ? { width: '100%' } : { width: '0%' }}
            className="absolute bottom-0 left-0 h-0.5 bg-warning"
            initial={{ width: '0%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}
