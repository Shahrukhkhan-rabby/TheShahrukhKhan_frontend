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
import { useDeleteProject } from '@/hooks/projects.hook';
import { TExperience } from '@/types';
import { useDeleteExperience } from '@/hooks/experience.hook';

interface TDeleteExperienceModalProps {
  experience: TExperience;
}

export default function DeleteExperienceModal({
  experience,
}: TDeleteExperienceModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteExperienceFn, isPending } = useDeleteExperience();

  const deleteExperienceHandler = async (id: string) => {
    if (!id) {
      console.error('Id is required but not provided.');
      return;
    }

    deleteExperienceFn(id);
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
                Delete the {`${experience?.title}`} experience
              </ModalHeader>

              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure?. You want a delete this experience
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} size="sm">
                  No
                </Button>
                <Button
                  isLoading={isPending}
                  onClick={() => deleteExperienceHandler(experience?._id)}
                  size="sm"
                  onPress={onClose}
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
