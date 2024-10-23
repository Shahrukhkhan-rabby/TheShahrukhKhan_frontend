'use server';

import { TEditSkill } from '@/app/(admin)/_components/modal/editSkillModal';
import { SkillCategory } from '@/constants/skills.constants';
import axiosInstance from '@/lib/axiosInstance';
import { TSkill } from '@/types';
import { FieldValues } from 'react-hook-form';

// Create skill
export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/skills', skillData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all skills
export const getAllSkills = async () => {
  const { data } = await axiosInstance.get('/skills');
  return data;
};

// Fetch skills based on the category
export const getSkillsByCategory = async (category?: SkillCategory) => {
  const { data } = await axiosInstance.get('/skills', {
    params: { category },
  });
  return data;
};

// Update skill
export const updateSkill = async (skillData: TEditSkill) => {
  try {
    const { data } = await axiosInstance.patch(
      `/skills/${skillData?.id}`,
      skillData?.data
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete skill
export const deleteSkill = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skills/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
