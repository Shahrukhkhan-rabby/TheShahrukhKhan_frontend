'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import AnimatedButton from './ui/button';
import { useTheme } from 'next-themes';

const Landing = () => {
  const [text] = useTypewriter({
    words: [
      'Junior Full-Stack Developer.',
      'Front-End Developer.',
      'Back-End Developer.',
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });
  const { theme } = useTheme();

  return (
    <div className="text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Side - Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={'https://i.ibb.co.com/8dT7CLd/Portfoli-imageo.jpg'}
                  alt="MD Rijwan Jannat"
                  className="rounded-lg w-full md:w-[400px] h-auto object-cover shadow-2xl "
                  width={400}
                  height={500}
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div
              className={`bg-slate-900 rounded-lg shadow-2xl overflow-hidden`}
            >
              <div className="px-6 py-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mt-2">
                  <span className="text-purple-400">{'<Name '}</span>
                  <span className="text-blue-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">
                    "text-sm font-semibold"
                  </span>
                  <span className="text-purple-400">{'>'}</span>
                  <br />
                  <span className="text-white ml-5 text-sm font-semibold">
                    MD Rijwan Jannat
                  </span>
                  <br />
                  <span className="text-purple-400">{'</Name>'}</span>
                </div>
                <div className="mt-5">
                  <span className="text-purple-400">{'<Passionate'}</span>
                  <span className="text-blue-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">
                    "text-lg font-semibold"
                  </span>
                  <span className="text-purple-400">{'>'}</span>
                  <br />
                  <div className="flex gap-1 items-center pl-5">
                    {' '}
                    <span className="text-white text-lg font-semibold">
                      Hello: I am a{' '}
                    </span>
                    <span className="text-green-400 text-lg font-semibold">
                      {text}
                    </span>
                  </div>
                  <Cursor cursorColor="white" />
                  <span className="text-purple-400">{'</Passionate>'}</span>
                </div>
                <div className="mt-5">
                  <span className="text-purple-400">{'<Objective>'}</span>
                  <br />
                  <p className="text-white pl-5">
                    As a Full-Stack developer, I don’t just write code—I
                    engineer digital masterpieces. Each keystroke builds
                    immersive web experiences that blend innovation with
                    artistry. With relentless persistence as my guide, I turn
                    vision into reality, evolving with every project. My code is
                    more than logic; it's a canvas where technology meets
                    creativity, unleashing boundless potential. 🚀🎨💻
                  </p>
                  <span className="text-purple-400">{'</Objective>'}</span>
                </div>
              </div>
            </div>
            <div className="p-2 flex items-center justify-center">
              <AnimatedButton
                bgColor="bg-transparent"
                textColor="text-default-900"
                borderColor="border-gray-600"
                href="#"
                text="View Resume"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
