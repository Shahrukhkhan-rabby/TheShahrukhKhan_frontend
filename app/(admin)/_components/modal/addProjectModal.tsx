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
import { FaImage, FaPlus } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { useCreateProject } from '@/hooks/projects.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import Image from 'next/image';
import { Spinner } from '@nextui-org/spinner';
import { Select, SelectItem } from '@nextui-org/select';
import { useGetAllSkills } from '@/hooks/skills.hook';
import { TSkill } from '@/types';
import { Selection } from '@nextui-org/table';

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addProjectFn, isPending } = useCreateProject();
  const [loadingImages, setLoadingImages] = useState(false);
  const { data } = useGetAllSkills();
  const skills = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      github: {
        frontend: '',
        backend: '',
      },
      live: '',
      technologies: [] as string[],
      images: [] as string[],
    },
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(
    new Set()
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setLoadingImages(true);
      const uploadedUrls: string[] = await Promise.all(
        Array.from(files).map(uploadImageToCloudinary)
      );
      setValue('images', uploadedUrls);
      setLoadingImages(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.images.length === 0) {
      console.error('At least one image is required.');
      return;
    }
    // Convert selected technologies Set to an array
    data.technologies = Array.from(selectedTechnologies) as string[];
    console.log(data);
    addProjectFn(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-semibold"
        endContent={<FaPlus />}
      >
        Add Project
      </Button>

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
                Add a New Project
              </ModalHeader>

              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Project Title"
                    variant="bordered"
                    placeholder="Enter project title"
                    {...register('title', {
                      required: 'Project title is required',
                    })}
                  />
                  {errors.title && (
                    <p className="text-error text-xs text-red-500">
                      {errors.title?.message}
                    </p>
                  )}

                  <Input
                    label="Description"
                    variant="bordered"
                    placeholder="Enter project description"
                    {...register('description', {
                      required: 'Project description is required',
                    })}
                  />
                  {errors.description && (
                    <p className="text-error text-xs text-red-500">
                      {errors.description?.message}
                    </p>
                  )}

                  <Input
                    label="GitHub (Frontend)"
                    variant="bordered"
                    placeholder="Enter frontend GitHub URL"
                    {...register('github.frontend', {
                      required: 'Frontend GitHub URL is required',
                    })}
                  />
                  {errors.github?.frontend && (
                    <p className="text-error text-xs text-red-500">
                      {errors.github.frontend?.message}
                    </p>
                  )}

                  <Input
                    label="GitHub (Backend)"
                    variant="bordered"
                    placeholder="Enter backend GitHub URL"
                    {...register('github.backend', {
                      required: 'Backend GitHub URL is required',
                    })}
                  />
                  {errors.github?.backend && (
                    <p className="text-error text-xs text-red-500">
                      {errors.github.backend?.message}
                    </p>
                  )}

                  <Input
                    label="Live Site URL"
                    variant="bordered"
                    placeholder="Enter live site URL"
                    {...register('live', {
                      required: 'Live site URL is required',
                    })}
                  />
                  {errors.live && (
                    <p className="text-error text-xs text-red-500">
                      {errors.live?.message}
                    </p>
                  )}

                  {/* Multiple Select for Skill Categories */}
                  <Select
                    label="Skill Category"
                    placeholder="Select skill category"
                    selectionMode="multiple"
                    selectedKeys={selectedTechnologies}
                    onSelectionChange={setSelectedTechnologies}
                    variant="bordered"
                    multiple
                  >
                    {skills?.map((technology: TSkill) => (
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

                  <label className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400">
                    <FaImage className="text-2xl" />
                    <p>Upload Images</p>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      variant="bordered"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.images && (
                    <p className="text-error text-xs text-red-500">
                      At least one image is required
                    </p>
                  )}

                  <div className="flex items-center gap-2 flex-nowrap">
                    {loadingImages ? (
                      <Spinner size="sm" color="warning" />
                    ) : (
                      watch('images')?.map((img: string, index: number) => (
                        <Image
                          key={index}
                          src={img}
                          width={100}
                          height={100}
                          alt={`Uploaded image ${index + 1}`}
                          className="h-14 w-14 mt-2 object-cover rounded-md border border-dashed border-default-200 p-1"
                        />
                      ))
                    )}
                  </div>

                  <ModalFooter>
                    <Button
                      className="text-default-900"
                      color="warning"
                      type="submit"
                      isLoading={isPending}
                      onPress={onClose}
                    >
                      {isPending ? 'Creating...' : 'Create'}
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
