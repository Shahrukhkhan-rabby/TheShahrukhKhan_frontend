'use client';

import React, { useState } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  NavbarBrand,
} from '@nextui-org/navbar';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/app/(home)/_components/ui/theme-switch';
import { linkVariants, menuVariants } from './animation';
import Logo from './logo';
import NavButtons from './navButtons';
import AnimatedButton from './button';
import Link from 'next/link';

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
        <NavbarBrand as={Link} href={'/'} className="gap-3 max-w-fit">
          <Logo />
        </NavbarBrand>

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
                  color="black"
                  to={item.href.substring(1)}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  className={clsx('cursor-pointer hover:text-warning')}
                  onClick={handleLinkClick}
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
        <NavbarItem className="hidden sm:flex gap-2">
          <AnimatedButton href="/dashboard" text="Dashboard" />
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
                  to={item.href.substring(1)}
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
        <NavbarItem className="hidden sm:flex gap-2">
          <AnimatedButton href="/dashboard" text="Dashboard" />
        </NavbarItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
