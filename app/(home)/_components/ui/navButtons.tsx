"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";

import { buttonVariants } from "./animation";

import { siteConfig } from "@/config/site";

export default function NavButtons() {
  return (
    <div className="flex flex-row gap-3 items-center">
      {/* LinkeDin Button with Animation */}
      <motion.div
        animate="animate"
        initial="initial"
        variants={buttonVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          isIconOnly
          aria-label="Discord"
          as={Link}
          target="_blank"
          color="warning"
          href={siteConfig.links.linkedin}
          radius="full"
          size="sm"
          startContent={<FaLinkedin className="text-default-500" size={18} />}
          variant="faded"
        />
      </motion.div>
      <motion.div
        animate="animate"
        initial="initial"
        variants={buttonVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          isIconOnly
          aria-label="Twitter"
          as={Link}
          target="_blank"
          color="warning"
          href={siteConfig.links.twitter}
          radius="full"
          size="sm"
          startContent={<FaTwitter className="text-default-500" size={18} />}
          variant="faded"
        />
      </motion.div>

      {/* Discord Button with Animation */}
      <motion.div
        animate="animate"
        initial="initial"
        variants={buttonVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          isIconOnly
          aria-label="Discord"
          as={Link}
          target="_blank"
          color="warning"
          href={siteConfig.links.discord}
          radius="full"
          size="sm"
          startContent={<FaDiscord className="text-default-500" size={18} />}
          variant="faded"
        />
      </motion.div>

      {/* Github Button with Animation */}
      <motion.div
        animate="animate"
        initial="initial"
        variants={buttonVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          isIconOnly
          aria-label="Github"
          as={Link}
          target="_blank"
          color="warning"
          href={siteConfig.links.github}
          radius="full"
          size="sm"
          startContent={<FaGithub className="text-default-500" size={18} />}
          variant="faded"
        />
      </motion.div>

      {/* Facebook Button with Animation */}
      <motion.div
        animate="animate"
        initial="initial"
        variants={buttonVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          isIconOnly
          aria-label="Facebook"
          as={Link}
          target="_blank"
          color="warning"
          href={siteConfig.links.facebook}
          radius="full"
          size="sm"
          startContent={<FaFacebookF className="text-default-500" size={18} />}
          variant="faded"
        />
      </motion.div>
    </div>
  );
}
