import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

export default function SkillsSkeleton() {
  return (
    <div className="bg-default-50 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-2xl space-y-3 h-[200px] border border-default-200">
      {/* Skill Icon */}
      <div className="bg-primaryColor p-3 rounded-full mb-4">
        <Skeleton className="w-12 h-12 p-3 rounded-full mb-4" />
      </div>

      {/* Skill Name */}
      <div>
        <Skeleton className="w-[150px] h-5 rounded-lg" />
      </div>

      {/* Skill Level */}
      <div>
        <Skeleton className="w-[100px] h-3 rounded-lg" />
      </div>

      {/* Skill Category */}
      <div>
        <Skeleton className="w-[100px] h-3 rounded-lg" />
      </div>
    </div>
  );
}
