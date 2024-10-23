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
import { FaTrashAlt } from 'react-icons/fa';
import { TBlog, TEducation } from '@/types';
import { useDeleteEducation } from '@/hooks/educations.hook';
import { useDeleteBlog } from '@/hooks/blogs.hook';

interface TDeleteBlogModalProps {
  blog: TBlog;
}

export default function DeleteBlogModal({ blog }: TDeleteBlogModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteBlogFn, isPending } = useDeleteBlog();

  const deleteBlogHandler = async (id: string) => {
    if (!id) {
      console.error('Id is required but not provided.');
      return;
    }

    await deleteBlogFn(id);
    onOpenChange();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        radius="full"
        size="sm"
        startContent={<FaTrashAlt className="text-red-500" />}
      />

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete blog
              </ModalHeader>
              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure you want to delete this blog entry?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} size="sm">
                  No
                </Button>
                <Button
                  isLoading={isPending}
                  onClick={() => deleteBlogHandler(blog._id)}
                  size="sm"
                  className="bg-red-500 text-white"
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
