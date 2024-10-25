"use client";
import React from "react";
import dynamic from "next/dynamic";
import { differenceInYears } from "date-fns";
import { TBlog, TProject, TSkill } from "@/types";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

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

  console.log(projects, skills, blogs);

  const achievementsList = [
    { metric: "Projects", value: projects?.length, postfix: "+" },
    { metric: "Skills", value: skills?.length, postfix: "+" },
    { metric: "Blogs", value: blogs?.length, postfix: "+" },
    { metric: "Awards", value: 0 }, // Set awards to 0 as specified
    { metric: "Years", value: currentYearCount }, // Calculated years since programming start date
  ];

  return (
    <div className="flex justify-around md:justify-between md:space-x-8 my-6">
      {achievementsList.map((achievement, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
        >
          <h2 className="text-warning text-2xl font-bold flex flex-row">
            <AnimatedNumbers
              includeComma
              animateToNumber={achievement.value}
              locale="en-US"
              className="text-warning text-2xl font-bold"
            />
            {achievement.postfix}
          </h2>
          <p className="text-default-600 text-base">{achievement.metric}</p>
        </div>
      ))}
    </div>
  );
};

export default AchievementsSection;
