import { TSkill } from '@/types';
import React from 'react';
import { motion } from 'framer-motion';

interface TSkillCardProps {
  skill: TSkill;
}

export default function SkillsCard({ skill }: TSkillCardProps) {
  return (
    <motion.div
      className="bg-default-50 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-2xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Skill Icon */}
      <div className="bg-primaryColor p-3 rounded-full mb-4">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Skill Name */}
      <h3 className="text-xl font-bold text-default-800">{skill.name}</h3>

      {/* Skill Level */}
      <p className="text-secondaryColor text-sm font-medium">
        Level: {skill.level}
      </p>

      {/* Skill Category */}
      <p className="text-default-500 text-xs mt-2">
        Category: {skill.category}
      </p>
    </motion.div>
  );
}
