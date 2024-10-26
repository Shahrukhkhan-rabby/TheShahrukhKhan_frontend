'use client';

import React, { useState } from 'react';
import { GiChessQueen } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../../../public/favicon.ico';

import { textVariants } from './animation';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';

export default function Logo() {
  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(true);

  const handleLinkClick = () => {
    // Disable hiding on scroll when clicking a section link
    setShouldHideOnScroll(false);
  };

  return (
    <ScrollLink
      duration={500}
      offset={-90}
      smooth={true}
      to="home" // The ID of the element to scroll to (without the #)
      onClick={handleLinkClick}
    >
      <motion.div
        animate="animate"
        className="flex items-center cursor-pointer"
        initial="initial"
        variants={textVariants}
        whileHover="whileHover"
      >
        <div className="w-10">
          <Image
            className="rounded-md"
            src={logo}
            alt="logo"
            width={500}
            height={500}
          />
        </div>
      </motion.div>
    </ScrollLink>
  );
}
