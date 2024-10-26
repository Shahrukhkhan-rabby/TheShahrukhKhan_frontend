import React from 'react';
import { Skeleton } from '@nextui-org/skeleton';

export default function SkillsSkeleton() {
  return (
    <div className="bg-default-50 rounded-lg px-6 py-2 flex items-center justify-center gap-4 transition transform hover:scale-105 hover:shadow-2xl border border-default-200 z-10">
      {/* Skill Icon */}
      <div className="bg-primaryColor rounded-full">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      {/* Skill Name */}
      <div>
        <Skeleton className="w-[150px] h-5 rounded-lg" />
      </div>
    </div>
  );
}
