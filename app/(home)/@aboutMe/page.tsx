import React from "react";
import About from "../_components/module/about";
import { getAllAbout } from "@/service/aboutService/aboutService";
import { getAllProjects } from "@/service/projectService/projectService";
import { getAllBlogs } from "@/service/blogService/blogService";
import { getAllSkills } from "@/service/skillsService/skillsService";
import Loader from "../_components/ui/skeleton/loader";
import { Title } from "../_components/ui/title";

export default async function AboutPage() {
  const aboutData = await getAllAbout();
  const about = aboutData?.data?.[0];
  const projectsData = await getAllProjects();
  const projects = projectsData?.data;
  const skillsData = await getAllSkills();
  const skills = skillsData?.data;
  const blogsData = await getAllBlogs();
  const blogs = blogsData?.data;

  return (
    <>
      <Title title1="About" title2="About" />
      <About about={about} projects={projects} skills={skills} blogs={blogs} />
    </>
  );
}
