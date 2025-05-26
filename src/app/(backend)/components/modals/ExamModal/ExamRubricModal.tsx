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
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={onOpen}
              >
                Start Examine
              </button>
      </div>
      <Modal
        className="container mx-auto"
        isOpen={isOpen}
        size="full"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <RubricExamForm examTitle={examTitle} rubric={rubric} student={student} onClose={onClose} />
              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
