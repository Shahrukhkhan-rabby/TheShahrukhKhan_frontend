"use client";

import React from "react";
import { TProject } from "@/types";
import ProjectCard from "./projectCard";
import { Title } from "../../ui/title";

interface TProjectProps {
  projects: TProject[];
}

const Project: React.FC<TProjectProps> = ({ projects }) => {
  return (
    <div>
      <Title title1="Projects" title2="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Project;
