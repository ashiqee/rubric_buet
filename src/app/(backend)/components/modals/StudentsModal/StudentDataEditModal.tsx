'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { FiEdit } from "react-icons/fi";

import CourseEditForm from "../../form/CourseEditForm";
import StudentDataEditForm from "../../form/StudentDataEditForm";


export default function StudentDataEditModal({student}:{student:any}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
       <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
            onClick={onOpen}
          >
            <FiEdit size={18} />
          </button>
      <Modal className="container mx-auto" isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
<StudentDataEditForm student={student} onClose={onClose}/>
               
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
