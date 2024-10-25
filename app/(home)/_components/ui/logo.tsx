"use client";

import React, { useState } from "react";
import { GiChessQueen } from "react-icons/gi";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // Correct import for react-scroll

import { textVariants } from "./animation";

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
        {/* Animated Icon */}
        <div>
          <GiChessQueen className="text-warning" size={30} />
        </div>

        {/* Animated Text */}
        <p className="font-semibold text-xl mt-1 text-default-900 hidden lg:block">
          RijwaN
        </p>
      </motion.div>
    </ScrollLink>
  );
}
