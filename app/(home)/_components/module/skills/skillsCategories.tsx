'use client';

import { SkillCategory } from '@/constants/skills.constants';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Key } from 'react';
import { useGetSkillsByCategory } from '@/hooks/skills.hook';
import { TSkill } from '@/types';
import SkillsCard from './skillsCard';

const SkillCategories: FC = () => {
  const categories = Object.values(SkillCategory);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || categories[0];
  const [selectedKey, setSelectedKey] = useState<string>(initialCategory);

  const { data, isLoading, error } = useGetSkillsByCategory();
  const skills = data?.data as TSkill[];

  // Handle category change
  const handleCategoryChange = (key: Key) => {
    const category = key as string;
    setSelectedKey(category);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.replace(`/?${params.toString()}#skills`);
  };

  // Smooth scroll with offset
  useEffect(() => {
    const element = document.querySelector('#skills');
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y });
    }
  }, [selectedKey]);

  // Update the selected key when URL changes
  useEffect(() => {
    if (searchParams.get('category') !== selectedKey) {
      setSelectedKey(searchParams.get('category') || categories[0]);
    }
  }, [searchParams, selectedKey, categories]);

  if (error) {
    return <p>Error loading skills!</p>;
  }

  return (
    <div className="flex flex-col mb-4">
      <Tabs
        aria-label="Skill Categories"
        selectedKey={selectedKey}
        onSelectionChange={handleCategoryChange}
      >
        {categories.map((category: SkillCategory) => (
          <Tab key={category} title={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {skills?.length ? (
                skills.map((skill) => (
                  <SkillsCard key={skill?._id} skill={skill} />
                ))
              ) : (
                <p>No skills available in this category.</p>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default SkillCategories;
