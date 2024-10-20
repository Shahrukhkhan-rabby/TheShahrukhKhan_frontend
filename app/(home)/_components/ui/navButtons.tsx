'use client';

import { siteConfig } from '@/config/site';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { buttonVariants } from './animation';

export default function NavButtons() {
  return (
    <div className="flex flex-row gap-3 items-center">
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          as={Link}
          isIconOnly
          size="sm"
          radius="full"
          color="primary"
          variant="faded"
          aria-label="Twitter"
          href={siteConfig.links.twitter}
          startContent={<FaTwitter className="text-default-500" size={18} />}
        />
      </motion.div>

      {/* Discord Button with Animation */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          as={Link}
          isIconOnly
          size="sm"
          radius="full"
          color="primary"
          variant="faded"
          aria-label="Discord"
          href={siteConfig.links.discord}
          startContent={<FaDiscord className="text-default-500" size={18} />}
        />
      </motion.div>

      {/* Github Button with Animation */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          as={Link}
          isIconOnly
          size="sm"
          radius="full"
          color="primary"
          variant="faded"
          aria-label="Github"
          href={siteConfig.links.github}
          startContent={<FaGithub className="text-default-500" size={18} />}
        />
      </motion.div>

      {/* Facebook Button with Animation */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Button
          as={Link}
          isIconOnly
          size="sm"
          radius="full"
          color="primary"
          variant="faded"
          aria-label="Facebook"
          href={siteConfig.links.facebook}
          startContent={<FaFacebookF className="text-default-500" size={18} />}
        />
      </motion.div>
    </div>
  );
}
