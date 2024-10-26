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

import { linkVariants, menuVariants } from './animation';
import Logo from './logo';
import NavButtons from './navButtons';
import AnimatedButton from './button';

import { ThemeSwitch } from '@/app/(home)/_components/ui/theme-switch';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/navigation';
import { FaDashcube } from 'react-icons/fa';

export const Navbar = () => {
  const router = useRouter();
  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(true);

  const handleLinkClick = () => {
    setShouldHideOnScroll(false);
    router.push('/');
  };

  return (
    <NextUINavbar
      className={`rounded-full border border-default-200 bg-opacity-5 top-4 ${!shouldHideOnScroll && 'top-4'}`}
      maxWidth="xl"
      position="sticky"
      shouldHideOnScroll={shouldHideOnScroll}
    >
      {/* Brand and logo */}
      <NavbarContent className="basis-1/5 sm:basis-full m-3" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Logo />
        </NavbarBrand>

        {/* Desktop links with animation */}
        <div className="hidden xl:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <motion.div
                animate="animate"
                initial="initial"
                variants={linkVariants}
                whileHover="whileHover"
              >
                <ScrollLink
                  className={clsx(
                    'cursor-pointer text-default-800 hover:text-warning'
                  )}
                  color="black"
                  duration={500}
                  offset={-90}
                  smooth={true}
                  to={item.href.substring(1)}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </ScrollLink>
              </motion.div>
            </NavbarItem>
          ))}
        </div>
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
          <AnimatedButton
            href="/dashboard"
            text="Dashboard"
            bgColor="bg-transparent"
            borderColor="text-warning border-default-200"
            IconComponent={FaDashcube}
          />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="flex xl:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu with staggered animation */}
      <NavbarMenu
        animate="open"
        as={motion.div}
        className="flex flex-col items-center"
        exit="closed"
        initial="closed"
        variants={menuVariants}
      >
        <div className="mx-4 mt-2 flex flex-col gap-2 items-center justify-center space-y-5">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <motion.div
                animate="animate"
                initial="initial"
                variants={linkVariants}
                whileHover="whileHover"
              >
                <ScrollLink
                  className={clsx('cursor-pointer text-foreground')}
                  duration={1500}
                  offset={-70}
                  smooth={true}
                  to={item.href.substring(1)}
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
