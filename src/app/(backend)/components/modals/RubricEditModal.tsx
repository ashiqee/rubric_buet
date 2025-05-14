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
import RubricTemplateForm from "../RubricsTemplateCreate";
import { Rubric } from "../RubricGrids";
import RubricCard from "../cards/RubricCard";

export default function RubricEditModal({rubrics}:{rubrics:Rubric[]}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-3 my-6 lg:grid-cols-4 gap-4">
            {rubrics.map((rubric:Rubric) => (
             <button onClick={onOpen} key={rubric._id}>
              <RubricCard rubric={rubric}  />
             </button>
            ))}
      
            
          </div>
      <Modal size="5xl" className="container mx-auto" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
<RubricTemplateForm onClose={onClose}/>
               
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
