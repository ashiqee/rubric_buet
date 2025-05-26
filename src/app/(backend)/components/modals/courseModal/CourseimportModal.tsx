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


export default function CourseImportModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="w-fit" onPress={onOpen}>Bluk import</Button>
      <Modal className="bg-opacity-0" isOpen={isOpen}  size="full" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody className="container relative my-8 rounded-md bg-gray-50 mx-auto">
                   <h2 className="text-center my-4 font-bold text-2xl" >Bulk course upload</h2>
                 <button className="absolute top-1 right-1 hover:bg-gray-400 p-1.5 px-3 hover:text-gray-100 text-gray-400 rounded-full " onClick={()=>onClose()} >X</button>
                 <ImportCourseCSV onClose={onClose} />

               
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
