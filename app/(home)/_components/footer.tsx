'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from 'react-icons/io5';
import Link from 'next/link';

import NavButtons from './ui/navButtons';

import { siteConfig } from '@/config/site';

export default function Footer() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Animation to reveal footer when scrolled to view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.offsetHeight;

      if (scrollPosition > pageHeight - 400) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    router.push('/');
  };

  // Footer animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Wave divider for the top of the footer
  const Wave = () => (
    <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full">
      <svg
        className="relative block w-full h-16 text-background"
        fill="currentColor"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
      </svg>
    </div>
  );

  return (
    <motion.footer
      animate={isVisible ? 'visible' : 'hidden'}
      className="relative text-default-900"
      initial="hidden"
      variants={footerVariants}
    >
      <Wave />

      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="pt-12 md:pt-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10"
          variants={childVariants}
        >
          {/* About column */}
          <motion.div
            className="md:col-span-5 space-y-6"
            variants={childVariants}
          >
            <div>
              <h2 className="text-sm md:text-xl font-bold text-default-800 mb-1">
                Md Rijwan Jannat
              </h2>
              <div className="w-20 h-1 bg-amber-500 mb-4 rounded-full" />
            </div>

            <p className="text-xs md:text-sm text-default-600 leading-relaxed">
              I am a passionate developer creating innovative solutions. My
              portfolio showcases my projects and skills in web development and
              design.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-default-700">
                <IoLocationOutline className="text-amber-500 text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm">Bogura, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-default-700">
                <IoMailOutline className="text-amber-500 text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  rijwanjannat36@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-default-700">
                <IoCallOutline className="text-amber-500 text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm">+880 1797-660947</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:col-span-3 space-y-6"
            variants={childVariants}
          >
            <div>
              <h3 className="text-sm font-bold text-default-800 mb-1">
                Quick Links
              </h3>
              <div className="w-16 h-1 bg-amber-500 mb-4 rounded-full" />
            </div>

            <nav className="flex flex-col space-y-3">
              {siteConfig.navItems.slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.href}
                  transition={{ type: 'spring', stiffness: 400 }}
                  whileHover={{ x: 5 }}
                >
                  <ScrollLink
                    className={clsx(
                      'cursor-pointer text-default-700 hover:text-amber-500 flex items-center transition-colors duration-300 text-xs md:text-sm'
                    )}
                    duration={500}
                    offset={-90}
                    smooth={true}
                    to={item.href.substring(1)}
                    onClick={handleLinkClick}
                  >
                    <span className="text-amber-500 mr-2 text-xs">❯</span>
                    {item.label}
                  </ScrollLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Connect column */}
          <motion.div
            className="md:col-span-4 space-y-6"
            variants={childVariants}
          >
            <div>
              <h3 className="text-sm font-bold text-default-800 mb-1">
                Connect With Me
              </h3>
              <div className="w-16 h-1 bg-amber-500 mb-4 rounded-full" />
            </div>

            <div className="flex flex-col space-y-4">
              <NavButtons />
            </div>

            {/* Newsletter subscription */}
            <div className="pt-3">
              <p className="text-xs md:text-sm text-default-700 mb-3">
                Subscribe to my newsletter
              </p>
              <div className="flex max-w-md">
                <input
                  className="flex-1 px-4 py-2 text-xs md:text-sm border border-default-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your email address"
                  type="email"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md text-xs md:text-sm font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-amber-200/50"
          variants={childVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs md:text-sm text-default-600 mb-4 md:mb-0">
              © {currentYear} Md Rijwan Jannat. All rights reserved.
            </p>

            <div className="flex space-x-6 text-xs md:text-sm text-default-600">
              <Link
                className="hover:text-amber-500 transition-colors duration-300"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:text-amber-500 transition-colors duration-300"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="hover:text-amber-500 transition-colors duration-300"
                href="#"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-300 rounded-full -mb-20 md:-mr-20 opacity-10" />
      <div className="absolute top-0 left-0 w-20 h-20 bg-amber-500 rounded-full -mt-10 md:-ml-10 opacity-10" />
    </motion.footer>
  );
}
