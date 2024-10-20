'use client';

import React, { useState } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link as ScrollLink } from 'react-scroll'; // Import Scroll Link from react-scroll
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/app/(home)/_components/ui/theme-switch';
import { linkVariants, menuVariants } from './animation';
import Logo from './logo';
import NavButtons from './navButtons';

export const Navbar = () => {
  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(true);

  const handleLinkClick = () => {
    // Disable hiding on scroll when clicking a section link
    setShouldHideOnScroll(false);
  };

  const handleScrollRestore = () => {
    // Re-enable hiding on scroll after some condition (optional)
    setShouldHideOnScroll(true);
  };

  return (
    <NextUINavbar
      shouldHideOnScroll={shouldHideOnScroll}
      className={`rounded-full border border-default-200 bg-opacity-5 top-4 ${!shouldHideOnScroll && 'top-4'}`}
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand and logo */}
      <NavbarContent className="basis-1/5 sm:basis-full m-3" justify="start">
        <Logo />

        {/* Desktop links with animation */}
        <ul className="hidden xl:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="whileHover"
              >
                <ScrollLink
                  to={item.href.substring(1)} // Remove '#' for react-scroll
                  smooth={true} // Enable smooth scrolling
                  offset={-90} // Adjust the scroll offset for sticky navbar
                  duration={500} // Animation duration
                  className={clsx(
                    'cursor-pointer',
                    'data-[active=true]:text-primary data-[active=true]:font-medium'
                  )}
                  onClick={handleLinkClick} // Handle link click
                >
                  {item.label}
                </ScrollLink>
              </motion.div>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right section: Theme Switch and Buttons */}
      <NavbarContent
        className="hidden xl:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <NavButtons />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="flex xl:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu with staggered animation */}
      <NavbarMenu
        as={motion.div}
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuVariants}
        className="flex flex-col items-center"
      >
        <div className="mx-4 mt-2 flex flex-col gap-2 items-center justify-center space-y-5">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="whileHover"
              >
                <ScrollLink
                  to={item.href.substring(1)} // Remove '#' for react-scroll
                  smooth={true}
                  offset={-70}
                  duration={1500}
                  className={clsx('cursor-pointer text-foreground')}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </ScrollLink>
              </motion.div>
            </NavbarMenuItem>
          ))}
        </div>
        <NavButtons />
      </NavbarMenu>
    </NextUINavbar>
  );
};
