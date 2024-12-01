'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import AnimatedButton from './ui/button';
import $ from 'jquery';
import ImageBox from './module/banner/imageBox';

const Landing = () => {
  const [text] = useTypewriter({
    words: [
      'Full-Stack Developer.',
      'Frontend Developer.',
      'MERN Stack Developer.',
      'Problem Solver.',
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  useEffect(() => {
    // jQuery for advanced image animations
    $('.profile-img').hover(
      function () {
        $(this).css({
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        });
      },
      function () {
        $(this).css({
          transform: 'scale(1)',
        });
      }
    );

    $('.profile-img').click(function () {
      $(this).css({
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)',
        transition: 'box-shadow 0.3s ease-in-out',
      });
    });
  }, []);

  return (
    <div className="flex items-center justify-center px-5 my-10 md:my-32">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Profile Image */}
        <ImageBox
          imageUrl="https://res.cloudinary.com/dihqveqyc/image/upload/v1733067074/ztghisys2mbrimijeazv.jpg"
          name="Md Rijwan Jannat"
          link="#contact"
          title="Full Stack Developer"
        />
        {/* Content Section */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-default-800">
              Hello, I&apos;m{' '}
              <span className="text-[#F5A524]">MD Rijwan Jannat</span>
            </h1>

            <h2 className="text-xl md:text-3xl text-default-700 mt-4">
              A {text}
              <Cursor cursorColor="#F5A524" />
            </h2>
            <p className="text-default-700 mt-6 leading-relaxed">
              As a Full-Stack developer, I combine technical expertise with a
              passion for creating intuitive and impactful web applications. I
              strive to build seamless digital experiences that bridge
              creativity and innovation.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
              <AnimatedButton
                bgColor="bg-warning hover:bg-warning-500"
                textColor="text-gray-800"
                href="https://drive.google.com/file/d/1x6DLawdKCuVhNGW4qnHnD3m6OYkd2fDH/view?usp=drive_link"
                text="View Resume"
                target="_blank"
              />

              <AnimatedButton
                bgColor="bg-transparent"
                borderColor="border-warning-500"
                textColor="text-[#F5A524]"
                href="#projects"
                text="Explore Projects"
                target="_self"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
