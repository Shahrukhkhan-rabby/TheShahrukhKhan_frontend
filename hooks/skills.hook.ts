import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SkillCategory } from '@/constants/skills.constants';
import { TSkill, TUpdateData } from '@/types';
import {
  createSkill,
  deleteSkill,
  getSkillsByCategory,
  editSkill,
} from '@/service/skillsService/skillsService';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

// Create skills
export const useCreateSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['add_skills'],
    mutationFn: (skillData) => createSkill(skillData),
    onSuccess: () => {
      toast.success('Skill create successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Edit skills
export const useEditSkill = () => {
  return useMutation({
    mutationKey: ['edit_skills'],
    mutationFn: (skillData: TUpdateData) => editSkill(skillData),
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
    mutationKey: ['delete_skills'],
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      toast.success('Skill deleted successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all skills
export const useGetAllSkills = () => {
  return useQuery({
    queryKey: ['get_skills'],
    queryFn: () => getSkillsByCategory(),
  });
};

// Get skills based on category
export const useGetSkillsByCategory = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as SkillCategory;

  return useQuery({
    queryKey: ['get_skills_by_category', category || 'Frontend'],
    queryFn: () => getSkillsByCategory(category || 'Frontend'),
    enabled: true,
  });
};
