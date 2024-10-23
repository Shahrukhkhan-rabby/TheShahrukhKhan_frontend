import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import {
  useCreateExperience,
  useEditExperience,
} from '@/hooks/experience.hook'; // Assuming you have a hook for creating experiences
import { Select, SelectItem } from '@nextui-org/select';
import { Selection } from '@nextui-org/table';
import { useGetAllSkills } from '@/hooks/skills.hook';
import { TExperience, TSkill } from '@/types';

interface TEditExperienceModalProps {
  experience: TExperience;
}

export default function EditExperienceModal({
  experience,
}: TEditExperienceModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: editExperienceFn, isPending } = useEditExperience();
  const { data } = useGetAllSkills();
  const technologies = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: experience,
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(
    new Set()
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.technologies = Array.from(selectedTechnologies) as string[];
    console.log(data);

    const experienceData = {
      id: experience._id,
      data: data,
    };
    editExperienceFn(experienceData);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-semibold"
        radius="full"
        size="sm"
        isIconOnly
        startContent={<FaPencilAlt />}
      />

      <Modal
        size="lg"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit the {`${experience?.title}`} project
              </ModalHeader>

              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Job Title"
                    variant="bordered"
                    placeholder="Enter job title"
                    {...register('title', {
                      required: 'Job title is required',
                    })}
                  />
                  {errors.title && (
                    <p className="text-error text-xs text-red-500">
                      {errors.title?.message}
                    </p>
                  )}

                  <Input
                    label="Company"
                    variant="bordered"
                    placeholder="Enter company name"
                    {...register('company', {
                      required: 'Company name is required',
                    })}
                  />
                  {errors.company && (
                    <p className="text-error text-xs text-red-500">
                      {errors.company?.message}
                    </p>
                  )}

                  <Input
                    label="Location"
                    variant="bordered"
                    placeholder="Enter location"
                    {...register('location', {
                      required: 'Location is required',
                    })}
                  />
                  {errors.location && (
                    <p className="text-error text-xs text-red-500">
                      {errors.location?.message}
                    </p>
                  )}

                  <Input
                    label="Start Date"
                    type="date"
                    variant="bordered"
                    {...register('startDate', {
                      required: 'Start date is required',
                    })}
                  />
                  {errors.startDate && (
                    <p className="text-error text-xs text-red-500">
                      {errors.startDate?.message}
                    </p>
                  )}

                  <Input
                    label="End Date"
                    type="date"
                    variant="bordered"
                    {...register('endDate')}
                  />

                  <Input
                    label="Description"
                    variant="bordered"
                    placeholder="Enter job description"
                    {...register('description', {
                      required: 'Job description is required',
                    })}
                  />
                  {errors.description && (
                    <p className="text-error text-xs text-red-500">
                      {errors.description?.message}
                    </p>
                  )}

                  {/* Multiple Select for Technologies */}
                  <Select
                    label="Technologies"
                    placeholder="Select technologies"
                    selectionMode="multiple"
                    selectedKeys={selectedTechnologies}
                    onSelectionChange={setSelectedTechnologies}
                    variant="bordered"
                    multiple
                  >
                    {technologies?.map((technology: TSkill) => (
                      <SelectItem key={technology._id} value={technology._id}>
                        {technology.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.technologies && (
                    <p className="text-error text-xs text-red-500">
                      {errors.technologies.message}
                    </p>
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
