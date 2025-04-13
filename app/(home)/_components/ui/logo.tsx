'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
};

const letterVariants = {
  initial: { y: 0 },
  whileHover: (i: number) => ({
    y: [-1, -2, -2.5, 0.5, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 1],
      delay: i * 0.05,
    },
  }),
};

export default function Logo() {
  const letters = 'MDRJ'.split('');

  return (
    <Link href="/">
      <motion.div
        animate="animate"
        className="flex items-center cursor-pointer"
        initial="initial"
        variants={logoVariants}
        whileHover="whileHover"
      >
        <div className="flex items-center bg-gradient-to-r from-warning to-default-50 p-2 rounded-lg">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={letterVariants}
              whileHover="whileHover"
            >
              <p
                className="text-white font-bold lg md:text-2xl m-0"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {letter}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="ml-2 text-foreground font-semibold hidden xs:block">
          Rijwan
        </p>
      </motion.div>
    </Link>
  );
}
