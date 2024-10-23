import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SkillCategory } from '@/constants/skills.constants';
import { TSkill } from '@/types';
import {
  createSkill,
  deleteSkill,
  getSkillsByCategory,
  updateSkill,
} from '@/service/skillsService/skillsService';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TEditSkill } from '@/app/(admin)/_components/modal/editSkillModal';

// Create skills
export const useCreateSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['skills'],
    mutationFn: (skillData) => createSkill(skillData),
    onSuccess: () => {
      toast.success('Skill create successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all skills
export const useGetAllSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkillsByCategory(),
  });
};

// Get skills base on category
export const useGetSkillsByCategory = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as SkillCategory;

  return useQuery({
    queryKey: ['skills', category],
    queryFn: () => getSkillsByCategory(category),
    enabled: !!category,
  });
};

// Edit skills
export const useEditSkill = () => {
  return useMutation({
    mutationKey: ['skills'],
    mutationFn: (skillData: TEditSkill) => updateSkill(skillData),
    onSuccess: () => {
      toast.success('Skill update successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete skills
export const useDeleteSkill = () => {
  return useMutation({
    mutationKey: ['skills'],
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      toast.success('Skill deleted successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
