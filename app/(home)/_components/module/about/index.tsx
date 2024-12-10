'use client';

import React from 'react';

import { Title } from '../../ui/title';
import AnimatedButton from '../../ui/button';

import { TAbout, TBlog, TProject, TSkill } from '@/types';
import Image from 'next/image';
import AchievementsSection from './achivement';
import { Chip } from '@nextui-org/chip';

interface TAboutProps {
  about: TAbout;
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

export default function About({ about, projects, skills, blogs }: TAboutProps) {
  return (
    <section className="bg-default-50 p-2 md:p-8 flex flex-col lg:flex-row justify-start items-start lg:space-x-8 space-y-8 lg:space-y-0">
      {/* Image Section */}
      <div className="w-full lg:w-1/3">
        <Image
          width={500}
          height={500}
          alt={about.me.name}
          className="w-full h-full lg:h-[350px] rounded-lg shadow-lg object-cover"
          src={about.image || 'https://example.com/my-image.jpg'}
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-2/3 text-center md:text-left space-y-2">
        <h2 className="text-xl md:text-3xl font-bold">{about.title}</h2>
        <p className="text-sm text-default-500 mb-4">
          Address: {about.address + ',' + about.country}
        </p>
        <p className="text-default-600 mb-10 text-sm">{about.description}</p>

        {/* Experience, Projects, Companies Worked */}
        <AchievementsSection
          projects={projects}
          skills={skills}
          blogs={blogs}
        />

        {/* Download CV Button */}
        <AnimatedButton
          bgColor="bg-transparent"
          borderColor="border-warning-500 my-5"
          textColor="text-[#F5A524]"
          href="https://drive.google.com/file/d/1x6DLawdKCuVhNGW4qnHnD3m6OYkd2fDH/view?usp=drive_link"
          text="View Resume"
          target="_blank"
        />
      </div>
    </section>
  );
}
