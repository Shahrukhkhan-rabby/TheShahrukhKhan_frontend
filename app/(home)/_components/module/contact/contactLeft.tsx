'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { Copy, Check, MapPin } from 'lucide-react';

import { useGetLink } from '@/hooks/links.hook';

const ContactLeft: React.FC = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');

  const [copied, setCopied] = useState<{ whatsapp: boolean; email: boolean }>({
    whatsapp: false,
    email: false,
  });

  const [, setHoveredCard] = useState<string | null>(null);

  const handleCopy = (value: string, field: 'whatsapp' | 'email') => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied({ ...copied, [field]: true });
      setTimeout(() => setCopied({ ...copied, [field]: false }), 2000); // Reset after 2 seconds
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      animate="visible"
      className="p-3 md:p-6 border border-default-100 rounded-xl backdrop-blur shadow-lg h-full flex flex-col w-full"
      initial="hidden"
      variants={fadeInUp}
    >
      <h3 className="text-xs md:text-sm md:text-lg font-bold text-default-800 mb-4">
        Let&apos;s Connect
      </h3>

      {/* Contact Cards */}
      <motion.div className="space-y-4 mb-6">
        {/* WhatsApp Card */}
        <motion.div
          className="p-4 rounded-lg border border-green-100/10 bg-green-500/10 transition-all duration-300"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -3 }}
          onHoverEnd={() => setHoveredCard(null)}
          onHoverStart={() => setHoveredCard('whatsapp')}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <FaWhatsapp className="size-4 md:size-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-green-600 font-medium">
                WhatsApp
              </p>
              <p className="text-default-700 text-xs md:text-sm font-medium">
                {link?.data?.phone || '+8801797660947'}
              </p>
            </div>
            <motion.button
              className="ml-2 bg-default-200/50 p-2 rounded-full text-default-500 hover:text-green-500 transition-all shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handleCopy(
                  `${link?.data?.phone || '+8801797660947'}`,
                  'whatsapp'
                )
              }
            >
              <AnimatePresence initial={false} mode="wait">
                {copied.whatsapp ? (
                  <motion.div
                    key="check"
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="text-green-500 size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Email Card */}
        <motion.div
          className="p-4 rounded-lg border border-blue-100/10 bg-blue-500/10 transition-all duration-300"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -3 }}
          onHoverEnd={() => setHoveredCard(null)}
          onHoverStart={() => setHoveredCard('email')}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <MdAlternateEmail className="size-4 md:size-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-blue-600 font-medium">
                Email
              </p>
              <p className="text-default-700 text-xs md:text-sm font-medium">
                {link?.data?.email || 'rijwanjannat36@gmail.com'}
              </p>
            </div>
            <motion.button
              className="ml-2 bg-default-200/50 p-2 rounded-full text-default-500 hover:text-blue-500 transition-all shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handleCopy(
                  `${link?.data?.email || 'rijwanjannat36@gmail.com'}`,
                  'email'
                )
              }
            >
              <AnimatePresence initial={false} mode="wait">
                {copied.email ? (
                  <motion.div
                    key="check"
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="text-blue-500 size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          className="p-4 rounded-lg border border-purple-100/10 bg-purple-500/10 transition-all duration-300"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500 text-white p-2 rounded-full">
              <MapPin className="size-4 md:size-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-purple-600 font-medium">
                Location
              </p>
              <p className="text-default-700 text-xs md:text-sm font-medium">
                Shajahanpur Bogura, Bangladesh
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Image with Floating Effect */}
      <motion.div
        className="flex-1 flex items-center justify-center mt-2 relative overflow-hidden rounded-xl"
        variants={fadeInUp}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-purple-400/20 rounded-xl z-0"
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          className="relative z-10"
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Image
            alt="animation"
            className="w-full h-auto md:h-56 object-contain rounded-lg"
            height={260}
            src={
              'https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif'
            }
            width={400}
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ['-10%', '110%'],
                x: [
                  `${Math.random() * 20 + 40}%`,
                  `${Math.random() * 20 + 40}%`,
                ],
                opacity: [0.2, 0.8, 0.2],
              }}
              className="absolute w-3 h-3 rounded-full bg-orange-400/30"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
                scale: Math.random() * 0.5 + 0.5,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactLeft;
