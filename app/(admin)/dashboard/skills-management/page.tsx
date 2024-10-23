import React, { Suspense } from 'react';
import SkillsTable from '../../_components/module/dashboard/skillsManagement/skillsTable';
import { getAllSkills } from '@/service/skillsService/skillsService';
import SkillsTableSkeleton from '../../_components/ui/skeleton/skillsTableSkeleton';

export default async function SkillsManagement() {
  const data = await getAllSkills();
  const skills = data?.data;

  return (
    <Suspense fallback={<SkillsTableSkeleton />}>
      {' '}
      <SkillsTable skills={skills} />
    </Suspense>
  );
}
