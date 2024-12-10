'use client';

import { Tab, Tabs } from '@nextui-org/tabs';
import { FC, useState } from 'react';
import SkillsSkeleton from '../../ui/skeleton/skillSkeleton';
import { Title } from '../../ui/title';
import SkillsCard from './skillsCard';
import { useGetSkillsByCategory } from '@/hooks/skills.hook';
import { TSkill } from '@/types';
import { SkillCategory } from '@/constants/skills.constants';
import Image from 'next/image';
import skillImage from '../../../../../assets/mainIconsdark.svg';

const SkillCategories: FC = () => {
  const categories = Object.values(SkillCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');

  // Fetch data based on selected category
  const { data, isLoading } = useGetSkillsByCategory(selectedCategory);
  const skills = data?.data as TSkill[];

  const handleCategoryChange = (key: string) => {
    setSelectedCategory(key);
  };

  return (
    <div className="flex flex-col gap-5 relative">
      <Tabs
        aria-label="Skill Categories"
        color="warning"
        selectedKey={selectedCategory}
        variant="bordered"
        onSelectionChange={(key) => handleCategoryChange(key as string)}
        className="z-10 flex items-center justify-center"
      >
        {categories.map((category) => (
          <Tab key={category} title={category} value={category}>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {isLoading ? (
                Array.from({ length: 7 }, (_, index) => (
                  <SkillsSkeleton key={index} />
                ))
              ) : skills && skills.length > 0 ? (
                skills.map((skill) => (
                  <SkillsCard key={skill._id} skill={skill} />
                ))
              ) : (
                <div className="flex items-center justify-center my-10">
                  <p className="text-default-900 font-semibold">
                    No Data Available
                  </p>
                </div>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
      <div className="absolute right-0 -top-20">
        <Image width={500} height={500} src={skillImage} alt="skill" />
      </div>
    </div>
  );
};

export default SkillCategories;
