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
import { FaImage, FaPencilAlt } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { Spinner } from '@nextui-org/spinner';
import Image from 'next/image';
import { useEditBlog } from '@/hooks/blogs.hook';
import { TBlog } from '@/types';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditBlogModal({ blog }: { blog: TBlog }) {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: editBlogFn, isPending } = useEditBlog();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: blog,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);
      setValue('imageUrl', uploadedUrl);
      setIsImageUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.imageUrl) {
      console.error('Image is required but not uploaded.');
      return;
    }

    const blogData = {
      id: blog?._id,
      data: data,
    };
    editBlogFn(blogData);
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
                Edit the blog
              </ModalHeader>

              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <ReactQuill
                    value={watch('content')}
                    onChange={(value) => setValue('content', value)}
                  />
                  {errors.content && (
                    <p className="text-error text-xs text-red-500">
                      {errors.content.message}
                    </p>
                  )}

                  <label className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400">
                    <FaImage className="text-2xl" />
                    <p>Upload Image</p>
                    <Input
                      type="file"
                      accept="image/*"
                      variant="bordered"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.imageUrl && (
                    <p className="text-error text-xs text-red-500">
                      Image is required
                    </p>
                  )}

                  {isImageUploading ? (
                    <div className="p-2">
                      <Spinner size="sm" color="warning" />
                    </div>
                  ) : (
                    watch('imageUrl') && (
                      <Image
                        src={watch('imageUrl')}
                        width={500}
                        height={500}
                        alt="Blog Image"
                        className="h-48 w-full mt-2 object-cover rounded-md border-dashed border-default-200 p-1"
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
                      {isPending ? 'Updating...' : 'Update'}
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
