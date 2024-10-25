// src/components/ProjectCard.tsx
import React, { useState } from "react";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { TProject } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import Link from "next/link";
import AnimatedButton from "../../ui/button";

interface ProjectCardProps {
  project: TProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full mb-4 shadow-lg rounded-lg overflow-hidden relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="relative">
        <CardHeader className="relative p-0">
          <div className="relative w-full h-44 md:h-64 rounded-lg overflow-hidden">
            <Image
              width={500}
              height={500}
              src={project.images[0]}
              alt={project.title}
              className="object-cover w-full h-full"
            />
            {/* Blur background overlay */}
            <motion.div
              className={`absolute inset-0 flex justify-center items-center bg-black ${
                isHovered ? "bg-opacity-20 backdrop-blur-sm" : "bg-opacity-0"
              } transition-all duration-300`}
            >
              {/* Buttons container with staggered animations */}
              {isHovered && (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <AnimatedButton
                        text="live"
                        bgColor="bg-white w-[120px] border-none flex item-center justify-center"
                        textColor="text-black"
                        href={project.live}
                        IconComponent={AiOutlineEye}
                        target="_self"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <AnimatedButton
                        text="Details"
                        bgColor="bg-transparent w-[120px]"
                        borderColor="border-white"
                        textColor="text-white"
                        href={`/project/${project._id}`}
                        IconComponent={AiOutlineInfoCircle}
                        target="_self"
                      />
                    </motion.div>
                  </div>
                  <h2 className="text-gary-300 font-bold text-lg text-center">
                    {project.title}
                  </h2>
                </div>
              )}
            </motion.div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
