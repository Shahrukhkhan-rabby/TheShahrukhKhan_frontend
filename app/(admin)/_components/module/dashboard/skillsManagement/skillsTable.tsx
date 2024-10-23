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
import { useGetAllSkills } from '@/hooks/skills.hook';
import React from 'react';
import { TSkill } from '@/types';
import { Button } from '@nextui-org/button';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AddSkillModal from '../../../modal/addSkillModal';
import EditSkillModal from '../../../modal/editSkillModal';
import DeleteSkillModal from '../../../modal/deleteSkillModal';

export default function SkillsTable() {
  const { data, isLoading, error } = useGetAllSkills();

  const skills = data?.data as TSkill[];

  if (isLoading) {
    return <p>Loading skills...</p>;
  }

  if (error) {
    return <p>Error loading skills!</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddSkillModal />
      </div>
      <Table aria-label="Skills Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Level</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Action</TableColumn>
          {/* Example for an additional column */}
        </TableHeader>
        <TableBody>
          {skills?.map((skill) => (
            <TableRow key={skill._id}>
              <TableCell>
                <Avatar src={skill.icon} />
              </TableCell>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.level}</TableCell>
              <TableCell>{skill.category}</TableCell>
              <TableCell>
                <div className="flex items-center gap-5 justify-start">
                  <EditSkillModal skill={skill} />
                  <DeleteSkillModal skill={skill} />
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
