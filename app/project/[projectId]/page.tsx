import React from 'react';

import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { getSingleProject } from '@/service/projectService/projectService';
import ProjectDetails from '@/app/(home)/_components/module/pojectDetaisl';

interface TDetailsParams {
  params: { projectId: string };
}

export default async function ProjectDetailsPage({ params }: TDetailsParams) {
  const projectId = params.projectId;
  const projectData = await getSingleProject(projectId);
  const project = projectData?.data;

  return (
    <div className="pt-4 px-2">
      <Navbar />
      <div className="mt-4">
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}
