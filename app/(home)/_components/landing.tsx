"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import AnimatedButton from "./ui/button";

const Landing = () => {
  const [text] = useTypewriter({
    words: [
      "Junior Full-Stack Developer.",
      "Front-End Developer.",
      "Back-End Developer.",
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  return (
    <div className="text-white py-10 px-2 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Side - Image */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="">
              <Image
                priority
                alt="MD Rijwan Jannat"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-h-80 md:h-80 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] bg-warning-500 rounded-full object-cover"
                height={500}
                width={400}
                src={
                  "https://res.cloudinary.com/dihqveqyc/image/upload/v1729853599/py2ggp6ws37papsprtjm.jpg"
                }
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div
              className={`bg-slate-900 opacity-80 rounded-lg shadow-2xl overflow-hidden`}
            >
              <div className="px-2 md:px-6 py-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mt-2 text-xs md:text-sm">
                  <span className="text-purple-400">&lt;Name </span>
                  <span className="text-blue-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">
                    &quot;text-sm font-semibold&quot;
                  </span>
                  <span className="text-purple-400">&gt;</span>
                  <br />
                  <span className="text-white ml-5 text-sm font-semibold">
                    MD Rijwan Jannat
                  </span>
                  <br />
                  <span className="text-purple-400">&lt;/Name&gt;</span>
                </div>
                <div className="mt-5 text-sm md:text-medium">
                  <span className="text-purple-400">&lt;Passionate</span>
                  <span className="text-blue-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">
                    &quot;text-lg font-semibold&quot;
                  </span>
                  <span className="text-purple-400">&gt;</span>
                  <br />
                  <div className="flex gap-1 items-center pl-5">
                    {" "}
                    <span className="text-white text-lg font-semibold">
                      Hello: I am a{" "}
                    </span>
                    <span className="text-green-400 text-lg font-semibold">
                      {text}
                    </span>
                  </div>
                  <Cursor cursorColor="white" />
                  <span className="text-purple-400">&lt;/Passionate&gt;</span>
                </div>
                <div className="mt-5">
                  <span className="text-purple-400">&lt;Objective&gt;</span>
                  <br />
                  <p className="text-white pl-5 text-sm md:text-medium">
                    As a Full-Stack developer, I don&apos;t just write code—I
                    engineer digital masterpieces. Each keystroke builds
                    immersive web experiences that blend innovation with
                    artistry. With relentless persistence as my guide, I turn
                    vision into reality, evolving with every project. My code is
                    more than logic; it&apos;s a canvas where technology meets
                    creativity, unleashing boundless potential. 🚀🎨💻
                  </p>
                  <span className="text-purple-400">&lt;/Objective&gt;</span>
                </div>
              </div>
            </div>
            <div className="p-2 flex items-center justify-center">
              <AnimatedButton
                bgColor="bg-transparent"
                borderColor="border-gray-600"
                textColor="text-default-900"
                href="https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=sharing"
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
