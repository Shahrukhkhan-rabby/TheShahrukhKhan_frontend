import { getAllProjects } from "@/service/projectService/projectService";
import React from "react";
import Project from "../_components/module/projects";
import { Title } from "../_components/ui/title";

export default async function ProjectsPage() {
  const data = await getAllProjects();
  const projects = data?.data;

  return (
    <div>
      <Title title1="Projects" title2="Projects" />
      <Project projects={projects} />
    </div>
  );
}
