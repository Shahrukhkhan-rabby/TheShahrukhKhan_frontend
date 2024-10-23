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
import { TProject } from '@/types/projectsTypes';
import { useDeleteProject } from '@/hooks/projects.hook';

interface TDeleteProjectModalProps {
  project: TProject;
}

export default function DeleteProjectModal({
  project,
}: TDeleteProjectModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteProjectFn, isPending } = useDeleteProject();

  const deleteProjectHandler = async (id: string) => {
    if (!id) {
      console.error('Id is required but not provided.');
      return;
    }

    deleteProjectFn(id);
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
                Delete the {`${project?.title}`} project
              </ModalHeader>

              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure?. You want a delete this Project
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} size="sm">
                  Cancel
                </Button>
                <Button
                  isLoading={isPending}
                  onClick={() => deleteProjectHandler(project?._id)}
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
