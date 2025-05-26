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
import { Rubric } from "../../RubricGrids";
import RubricTemplateEditForm from "../../RubricsTemplateEdit";
import RubricExamForm from "./RubricExamForm";
import { Student } from "@/types/models";


export default function ExamRubricModal({ rubric,student,examTitle }: { rubric: Rubric,student:Student,examTitle:string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div>
        <button
                onClick={onOpen}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Examine
              </button>
      </div>
      <Modal
        size="full"
        className="container mx-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <RubricExamForm student={student} examTitle={examTitle} rubric={rubric} onClose={onClose} />
              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
