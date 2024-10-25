import { getAllProjects } from "@/service/projectService/projectService";
import React from "react";
import Project from "../_components/module/projects";

export default async function ProjectsPage() {
  const data = await getAllProjects();
  const projects = data?.data;

  return (
    <div>
      <Project projects={projects} />
    </div>
  );
}
