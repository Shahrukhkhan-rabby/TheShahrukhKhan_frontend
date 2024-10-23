'use client';

import React from 'react';
import { GiChessQueen } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { textVariants } from './animation';

export default function Logo() {
  return (
    <motion.div
      variants={textVariants}
      className="flex items-center"
      initial="initial"
      animate="animate"
      whileHover="whileHover"
    >
      {/* Animated Icon */}
      <div>
        <GiChessQueen className="text-warning" size={30} />
      </div>

      {/* Animated Text */}
      <p className="font-semibold text-xl mt-1 text-default-900 hidden lg:block">
        RijwaN
      </p>
    </motion.div>
  );
}
