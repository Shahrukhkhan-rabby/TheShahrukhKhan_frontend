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
import { TEducation } from '@/types';
import { useDeleteEducation } from '@/hooks/educations.hook';

interface TDeleteEducationModalProps {
  education: TEducation;
}

export default function DeleteEducationModal({
  education,
}: TDeleteEducationModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteEducationFn, isPending } = useDeleteEducation();

  const deleteEducationHandler = async (id: string) => {
    if (!id) {
      console.error('Id is required but not provided.');
      return;
    }

    await deleteEducationFn(id);
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
                Delete {education.institution}
              </ModalHeader>
              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure you want to delete this education entry?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} size="sm">
                  No
                </Button>
                <Button
                  isLoading={isPending}
                  onClick={() => deleteEducationHandler(education._id)}
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
