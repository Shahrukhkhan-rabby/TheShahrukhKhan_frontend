import { getAllEducations } from '@/service/educationService/educationService';
import React, { Suspense } from 'react';
import EducationTable from '../../_components/module/dashboard/educationManagement/educationTable';
import EducationTableSkeleton from '../../_components/ui/skeleton/educationTableSkeleton';

export default async function EducationManagement() {
  const data = await getAllEducations();

  console.log(data);
  const educations = data?.data;
  return (
    <Suspense fallback={<EducationTableSkeleton />}>
      <EducationTable educations={educations} />
    </Suspense>
  );
}
