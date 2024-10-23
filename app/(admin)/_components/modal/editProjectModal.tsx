import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FaImage, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'; // Import React Hook Form
import { Select, SelectItem } from '@nextui-org/select';
import { Input } from '@nextui-org/input';
import { SkillLevel, SkillCategory } from '@/constants/skills.constants';
import {
  useCreateSkill,
  useEditSkill,
  useGetAllSkills,
} from '@/hooks/skills.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import Image from 'next/image';
import { TProject } from '@/types/projectsTypes';
import { TSkill } from '@/types';
import { useEditProject } from '@/hooks/projects.hook';

interface TEditProjectModalProps {
  project: TProject;
}

export interface TEditProject {
  id: string;
  data: FieldValues;
}

export default function EditProjectModal({ project }: TEditProjectModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useGetAllSkills();
  const skills = data?.data;

  const { mutate: editProjectFn, isPending } = useEditProject();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: project?.title,
      description: project?.description,
      live: project.live,
      images: project.images,
      technologies: project.technologies,
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setValue('images', uploadedUrl);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.images) {
      console.error('Images is required but not uploaded.');
      return;
    }
    const skillData: TEditProject = {
      id: project?._id,
      data: data,
    };

    editProjectFn(skillData);
  };

  const ProjectTechnologies = skills?.map((skill: TSkill) => {
    return {
      key: skill._id,
      value: skill.name,
    };
  });

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        radius="full"
        size="sm"
        startContent={<FaPencilAlt className="text-default-800" />}
      />

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit the {`${project?.title}`} Skill
              </ModalHeader>

              <ModalBody>
                {/* Form - Using React Hook Form */}
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Project Title"
                    variant="bordered"
                    placeholder="Enter project title"
                    {...register('title', {
                      required: 'PRoject name is required',
                    })}
                  />
                  {errors.title && (
                    <p className="text-error">{errors.title.message}</p>
                  )}

                  <Input
                    label="Project Description"
                    variant="bordered"
                    placeholder="Enter project description"
                    {...register('description', {
                      required: 'Project description is required',
                    })}
                  />
                  {errors.description && (
                    <p className="text-error">{errors.description.message}</p>
                  )}

                  <Input
                    label="Project Live Link"
                    variant="bordered"
                    placeholder="Enter project live link"
                    {...register('live', {
                      required: 'Project live link is required',
                    })}
                  />
                  {errors.description && (
                    <p className="text-error">{errors.description.message}</p>
                  )}

                  <Select
                    label="Project technologies"
                    placeholder="Select project technologies"
                    variant="bordered"
                    {...register('technologies', {
                      required: 'Project technologies is required',
                    })}
                    multiple
                  >
                    {ProjectTechnologies.map((technologies) => (
                      <SelectItem key={technologies} value={technologies}>
                        {technologies}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.technologies && (
                    <p className="text-error">{errors.technologies.message}</p>
                  )}

                  <label className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400">
                    <FaImage className="text-2xl" />
                    <p>Upload Images</p>
                    <Input
                      type="file"
                      accept="image/*"
                      variant="bordered"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.images && (
                    <p className="text-error">Images is required</p>
                  )}

                  {/* Show uploaded icon preview */}
                  {watch('images') && (
                    <Image
                      src={watch('images')}
                      width={500}
                      height={500}
                      alt="Skill Icon"
                      className="h-12 w-12 mt-2 object-cover rounded-md border-dashed border-default-200 p-1"
                    />
                  )}

                  <ModalFooter>
                    <Button
                      className="text-default-900"
                      color="warning"
                      type="submit"
                      isLoading={isPending}
                      onPress={onClose}
                    >
                      {isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
