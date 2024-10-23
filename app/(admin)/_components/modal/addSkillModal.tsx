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
import { Select, SelectItem } from '@nextui-org/select';
import { Input } from '@nextui-org/input';
import { SkillLevel, SkillCategory } from '@/constants/skills.constants';
import { useCreateSkill } from '@/hooks/skills.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import Image from 'next/image';
import { Spinner } from '@nextui-org/spinner';

export default function AddSkillModal() {
  const [isImageUploading, setIsImageUploading] = useState(false); // Loader state for image
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: addSkillFn, isPending } = useCreateSkill();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      level: '',
      category: '',
      icon: '',
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);
      setValue('icon', uploadedUrl);
      setIsImageUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.icon) {
      console.error('Icon is required but not uploaded.');
      return;
    }

    console.log(data);
    addSkillFn(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-semibold"
        variant="faded"
        color="warning"
        endContent={<FaPlus />}
      >
        Add Skill
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
                Add a New Skill
              </ModalHeader>

              <ModalBody>
                {/* Form - Using React Hook Form */}
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Skill Name"
                    variant="bordered"
                    placeholder="Enter skill name"
                    {...register('name', {
                      required: 'Skill name is required',
                    })}
                  />
                  {errors.name && (
                    <p className="text-error text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}

                  <Select
                    label="Skill Level"
                    placeholder="Select skill level"
                    variant="bordered"
                    {...register('level', {
                      required: 'Skill level is required',
                    })}
                  >
                    {Object.values(SkillLevel).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.level && (
                    <p className="text-error text-xs text-red-500">
                      {errors.level.message}
                    </p>
                  )}

                  <Select
                    label="Skill Category"
                    placeholder="Select skill category"
                    variant="bordered"
                    {...register('category', {
                      required: 'Skill category is required',
                    })}
                  >
                    {Object.values(SkillCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <p className="text-error text-xs text-red-500">
                      {errors.category.message}
                    </p>
                  )}

                  <label className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400">
                    <FaImage className="text-2xl" />
                    <p>Upload Icon</p>
                    <Input
                      type="file"
                      accept="image/*"
                      variant="bordered"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.icon && (
                    <p className="text-error text-xs text-red-500">
                      Icon is required
                    </p>
                  )}

                  {/* Show loader or uploaded icon preview */}
                  {isImageUploading ? (
                    <div className="p-2">
                      <Spinner size="sm" color="warning" />
                    </div>
                  ) : (
                    watch('icon') && (
                      <Image
                        src={watch('icon')}
                        width={500}
                        height={500}
                        alt="Skill Icon"
                        className="h-12 w-12 mt-2 object-cover rounded-md border-dashed border-default-200 p-1"
                      />
                    )
                  )}

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
