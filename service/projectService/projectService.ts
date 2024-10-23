'use server';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

// Create project
export const createProject = async (projectData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/projects', projectData);

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all project
export const getAllProjects = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['projects'],
    },
  };

  const { data } = await axiosInstance.get('/projects', { fetchOptions });
  return data;
};

// Update project
export const editProject = async (projectData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/projects/${projectData?.id}`,
      projectData?.data
    );

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete project
export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/${id}`);

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
