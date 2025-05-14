"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import RubricTemplateForm from "../RubricsTemplateCreate";
import { Rubric } from "../RubricGrids";
import RubricCard from "../cards/RubricCard";
import RubricTemplateEditForm from "../RubricsTemplateEdit";

export default function RubricEditModal({ rubric }: { rubric: Rubric }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div>
        <button className="w-full text-left" onClick={onOpen}>
          <RubricCard rubric={rubric} />
        </button>
      </div>
      <Modal
        size="5xl"
        className="container mx-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <RubricTemplateEditForm rubric={rubric} onClose={onClose} />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
