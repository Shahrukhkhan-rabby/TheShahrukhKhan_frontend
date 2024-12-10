import React from 'react';
import skillImage from '../../../assets/mainIconsdark.svg';
import SkillCategories from '../_components/module/skills/skillsCategories';
import { Title } from '../_components/ui/title';

export default function SkillsPage() {
  return (
    <div>
      <Title title1="Skills" title2="Skills" />
      <SkillCategories />
    </div>
  );
}
