'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import $ from 'jquery';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

import AnimatedButton from './ui/button';
import ImageBox from './module/banner/imageBox';

import { useGetLink } from '@/hooks/links.hook';
import { useGetAllAbout } from '@/hooks/about.hook';

const Landing = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');
  const { data: aboutData } = useGetAllAbout();
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
    <>
      <div className="flex items-center justify-center px-5 mt-10  md:mt-32 md:mb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Profile Image */}
          <ImageBox
            imageUrl={
              aboutData?.data?.image ||
              'https://res.cloudinary.com/dihqveqyc/image/upload/v1733067074/ztghisys2mbrimijeazv.jpg'
            }
            link="#contact"
            name="Md Rijwan Jannat"
            title="Full Stack Developer"
          />
          {/* Content Section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-8/12"
            initial={{ opacity: 0, y: 50 }}
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
                  href={
                    link?.data?.resume ||
                    'https://drive.google.com/file/d/15OqqkOMwSooI_iuQhrb7bCAQLEGug-sN/view?usp=drive_link'
                  }
                  target="_blank"
                  text="View Resume"
                  textColor="text-gray-800"
                />
                <AnimatedButton
                  IconComponent={AiOutlineFundProjectionScreen}
                  bgColor="bg-transparent"
                  borderColor="border-warning-500"
                  href="#projects"
                  target="_self"
                  text="Explore Projects"
                  textColor="text-[#F5A524]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="absolute top-0 left-0 w-full h-[60px] bg-warning blur-[150px] transform rotate-45" />
      </div>
    </>
  );
};

export default Landing;
