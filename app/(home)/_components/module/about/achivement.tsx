'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { differenceInYears } from 'date-fns';
import { TBlog, TProject, TSkill } from '@/types';

interface TAchievementsProps {
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

const AchievementsSection = ({
  projects,
  skills,
  blogs,
}: TAchievementsProps) => {
  const programmingStartDate = new Date(2022, 8, 1); // September 1, 2022
  const currentYearCount = differenceInYears(new Date(), programmingStartDate);

  const achievementsList = [
    { metric: 'Experience', value: currentYearCount, postfix: '+' },
    { metric: 'Projects', value: projects?.length, postfix: '+' },
    { metric: 'Skills', value: skills?.length, postfix: '+' },
    { metric: 'Blogs', value: blogs?.length, postfix: '+' },
    { metric: 'Awards', value: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-3"
      style={{ marginTop: '30px' }}
    >
      {achievementsList.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center justify-center px-4"
        >
          <motion.h2 className="text-warning text-xl md:text-3xl font-bold flex flex-row items-baseline">
            <Counter from={0} to={achievement.value} />
            {achievement.postfix && (
              <span className="ml-1">{achievement.postfix}</span>
            )}
          </motion.h2>
          <p className="text-foreground/80 text-sm md:text-lg">
            {achievement.metric}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Counter = ({ from, to }: any) => {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(animationDuration / frameDuration);
    const easeOutQuad = (t: number) => t * (2 - t);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setCount(Math.floor(from + (to - from) * progress));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [from, to]);

  return <motion.span>{count}</motion.span>;
};

export default AchievementsSection;
