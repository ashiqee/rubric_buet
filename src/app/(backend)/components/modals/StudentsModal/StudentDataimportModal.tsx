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
import CreateCourseForm from "../../form/CreateCourseForm";
import ImportCourseCSV from "../../imports/ImportCourseCSV";


export default function StudentDataImportModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="w-fit" onPress={onOpen}>Bluk import</Button>
      <Modal size="full" className="bg-opacity-0"  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody className="container my-8 rounded-md bg-gray-50 mx-auto">
                 <ImportCourseCSV onClose={onClose} />

               
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
