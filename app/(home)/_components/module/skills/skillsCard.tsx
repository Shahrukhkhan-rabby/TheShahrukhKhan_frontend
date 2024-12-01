"use client";

import React from "react";
import { motion } from "framer-motion";

import { TSkill } from "@/types";
import Image from "next/image";

interface TSkillCardProps {
  skill: TSkill;
}

export default function SkillsCard({ skill }: TSkillCardProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="bg-default-50 rounded-lg px-3 py-1 md:px-6 md:py-2 flex items-center justify-center gap-4 transition transform hover:scale-105 hover:shadow-2xl border border-default-200 z-10"
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Skill Icon */}
      <div className="bg-warningColor rounded-full ">
        <Image
          width={500}
          height={500}
          alt={skill.name}
          className="size-6 md:size-10 object-contain"
          src={skill.icon}
        />
      </div>

      {/* Skill Name */}
      <h3 className="text-sm md:text-lg font-bold text-default-800">
        {skill.name}
      </h3>
    </motion.div>
  );
}
