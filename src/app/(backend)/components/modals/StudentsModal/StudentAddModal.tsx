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

import StudentAddForm from "../../form/StudentAddForm";


export default function StudentAddModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="w-fit" onPress={onOpen}>Add New Student</Button>
      <Modal size="5xl" className="container mx-auto" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
<StudentAddForm onClose={onClose}/>
               
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
