"use client";

import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

interface TitleProps {
  title1: string;
  title2: string;
}

export const Title: React.FC<TitleProps> = ({ title1, title2 }) => {
  return (
    <section className="my-5 md:my-10 w-1/5">
      <div className="flex items-center justify-start gap-2 text-lg md:text-xl text-default-900 font-semibold relative">
        <h2>{title1}</h2>
        <IoIosArrowForward className="text-warning" />
        {/* Gradient bar with framer-motion animation */}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-warning to-transparent"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </section>
  );
};
