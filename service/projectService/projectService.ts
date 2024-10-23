'use server';

import { TEditProject } from '@/app/(admin)/_components/modal/editProjectModal';
import axiosInstance from '@/lib/axiosInstance';
import { FieldValues } from 'react-hook-form';

// Create project
export const createProject = async (projectData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/projects', projectData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all project
export const getAllProjects = async () => {
  const { data } = await axiosInstance.get('/projects');
  return data;
};

// Update project
export const updateProject = async (projectData: TEditProject) => {
  try {
    const { data } = await axiosInstance.patch(
      `/projects/${projectData?.id}`,
      projectData?.data
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete project
export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
