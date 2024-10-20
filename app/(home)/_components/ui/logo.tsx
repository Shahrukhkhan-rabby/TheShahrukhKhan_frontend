'use client';

import { NavbarBrand } from '@nextui-org/navbar';
import React from 'react';
import { GiChessQueen } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { textVariants } from './animation';
import Link from 'next/link';

export default function Logo() {
  return (
    <NavbarBrand as={Link} href={'/'} className="gap-3 max-w-fit">
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
        <p className="font-semibold text-xl mt-1 text-default-900">RijwaN</p>
      </motion.div>
    </NavbarBrand>
  );
}
