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
        className="container mx-auto"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <RubricTemplateEditForm rubric={rubric} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
