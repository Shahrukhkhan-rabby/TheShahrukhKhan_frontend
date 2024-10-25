"use client";

import React from "react";

import { Title } from "../../ui/title";
import AnimatedButton from "../../ui/button";

import { TAbout, TBlog, TProject, TSkill } from "@/types";
import Image from "next/image";
import AchievementsSection from "./achivement";

interface TAboutProps {
  about: TAbout;
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

export default function About({ about, projects, skills, blogs }: TAboutProps) {
  return (
    <div>
      <Title title1="About" title2="About" />
      <section className="bg-default-50 p-2 md:p-8 flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
        {/* Image Section */}
        <div className="md:w-1/3">
          <Image
            width={500}
            height={500}
            alt={about.me.name}
            className="w-full h-full md:h-[350px] rounded-lg shadow-lg object-cover"
            src={about.image || "https://example.com/my-image.jpg"}
          />
        </div>

        {/* Text Section */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{about.title}</h2>
          <p className="text-default-600 mb-4">{about.description}</p>

          {/* Experience, Projects, Companies Worked */}
          <AchievementsSection
            projects={projects}
            skills={skills}
            blogs={blogs}
          />

          {/* Download CV Button */}
          <AnimatedButton
            bgColor="bg-transparent"
            borderColor="border-gray-600"
            href="https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=sharing"
            text="View Resume"
            textColor="text-default-900"
          />
        </div>
      </section>
    </div>
  );
}
