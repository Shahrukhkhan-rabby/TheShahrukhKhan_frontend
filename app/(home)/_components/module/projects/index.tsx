'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ChevronRight } from 'lucide-react';

import { TProject } from '@/types';

interface ProjectsProps {
  projects: TProject[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="">
      {/* Projects grid */}
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {projects?.map((project, index) => (
            <motion.div
              key={project._id}
              animate={controls}
              className="relative"
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => setHoveredProject(project._id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="group h-full overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow- border border-default-100/50">
                {/* Project image with overlay */}
                <div className="relative h-20 md:h-48 w-full overflow-hidden">
                  <Image
                    fill
                    alt={project.title}
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    src={
                      project?.images[0] ||
                      '/placeholder.svg?height=400&width=600'
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />

                  {/* Technology tags */}
                  <div className="absolute top-1 md:top-4 left-1 md:left-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech._id}
                        className="rounded-full bg-black/30 backdrop-blur-sm px-2 md:px-3 md:py-1 text-[8px] md:text-xs font-medium text-white"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-black/30 backdrop-blur-sm px-2 md:px-3 md:py-1 text-[8px] md:text-xs font-medium text-white">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project info */}
                <div className="p-3 md:p-6">
                  <h3 className="text-[10px] md:text-[16px] font-bold text-default-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[8px] md:text-xs text-default-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-3">
                      {project.live && (
                        <Link
                          className="flex items-center justify-center size-6 md:size-8 rounded-full bg-default-100 text-default-700 hover:bg-default-200 transition-colors"
                          href={project.live}
                          target="_blank"
                        >
                          <ExternalLink className="size-3 md:size-4" />
                        </Link>
                      )}
                    </div>
                    <Link
                      className="flex items-center text-warning-500 font-medium hover:text-warning-600 transition-colors text-[10px] md:text-[12px]"
                      href={`/project/${project._id}`}
                    >
                      View Details
                      <ChevronRight className="ml-1 size-3 md:size-4 mt-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Animated border */}
                <AnimatePresence>
                  {hoveredProject === project._id && (
                    <motion.div
                      animate={{ pathLength: 1 }}
                      className="absolute inset-0 pointer-events-none"
                      exit={{ pathLength: 0 }}
                      initial={{ pathLength: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          className="animate-dash"
                          fill="none"
                          height="100%"
                          rx="12"
                          stroke="url(#border-gradient)"
                          strokeDasharray="0 1"
                          strokeWidth="2"
                          width="100%"
                        />
                        <defs>
                          <linearGradient
                            id="border-gradient"
                            x1="0%"
                            x2="100%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="50%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
