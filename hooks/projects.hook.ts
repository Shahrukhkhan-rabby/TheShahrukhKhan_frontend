import { TEditProject } from '@/app/(admin)/_components/modal/editProjectModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '@/service/projectService/projectService';

// Create projects
export const useCreateProject = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['projects'],
    mutationFn: (projectData) => createProject(projectData),
    onSuccess: () => {
      toast.success('Projects create successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all projects
export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getAllProjects(),
  });
};

// Edit projects
export const useEditProject = () => {
  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (projectData: TEditProject) => updateProject(projectData),
    onSuccess: () => {
      toast.success('Projects update successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete projects
export const useDeleteProject = () => {
  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      toast.success('Projects deleted successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
