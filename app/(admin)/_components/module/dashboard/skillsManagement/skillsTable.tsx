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
import React from 'react';
import { TSkill } from '@/types';
import AddSkillModal from '../../../modal/addSkillModal';
import EditSkillModal from '../../../modal/editSkillModal';
import DeleteSkillModal from '../../../modal/deleteSkillModal';

interface TSkillsTableProps {
  skills: TSkill[];
}

export default function SkillsTable({ skills }: TSkillsTableProps) {
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
        </TableHeader>
        <TableBody emptyContent={'No skills available'}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
