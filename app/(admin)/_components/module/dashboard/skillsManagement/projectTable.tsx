'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Avatar } from '@nextui-org/avatar';
import { useGetAllProjects } from '@/hooks/projects.hook';
import React from 'react';
import { TProject } from '@/types/projectsTypes';
import AddProjectModal from '../../../modal/addProjectModal';
import EditProjectModal from '../../../modal/editProjectModal';
import DeleteProjectModal from '../../../modal/deleteProjectModal';

export default function ProjectsTable() {
  const { data, isLoading, error } = useGetAllProjects();

  const Projects = data?.data as TProject[];

  if (isLoading) {
    return <p>Loading Projects...</p>;
  }

  if (error) {
    return <p>Error loading Projects!</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddProjectModal />
      </div>
      <Table aria-label="Projects Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Action</TableColumn>
          {/* Example for an additional column */}
        </TableHeader>
        <TableBody>
          {Projects?.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <Avatar src={project.images[0]} />
              </TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-5 justify-start">
                  <EditProjectModal project={project} />
                  <DeleteProjectModal project={project} />
                </div>
              </TableCell>
              {/* Placeholder if no status */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
