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
      className="bg-default-50 rounded-lg px-6 py-2 flex items-center justify-center gap-4 transition transform hover:scale-105 hover:shadow-2xl border border-default-200"
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Skill Icon */}
      <div className="bg-primaryColor rounded-full ">
        <Image
          width={500}
          height={500}
          alt={skill.name}
          className="w-10 h-10 object-contain"
          src={skill.icon}
        />
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-bold text-default-800">{skill.name}</h3>
    </motion.div>
  );
}
