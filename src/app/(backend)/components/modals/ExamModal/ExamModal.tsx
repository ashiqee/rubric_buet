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

import ExamRubricModal from "./ExamRubricModal";

export default function ExamModal({
  rubric,
  students,
  examTitle
}: {
  rubric: Rubric;
  students: any;
  examTitle:string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div>
        <Button color="success" size="sm" variant="bordered" onPress={onOpen}>
          Start Now
        </Button>
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
  <div className="flex justify-between mr-6">
    <h2 className="text-xl font-semibold mt-4">Students List</h2>
  <h2 className="text-xl font-semibold mt-4">{examTitle}</h2>
  </div>

  <div className="overflow-x-auto max-h-[700px] my-4">
    <table className="min-w-full text-sm text-left border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">SL</th>
          <th className="border px-4 py-2">Student Name</th>
          <th className="border px-4 py-2">Student ID</th>
          <th className="border px-4 py-2">Exam Status</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((s: any, index: number) => (
          <tr key={s._id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{s.name}</td>
            <td className="border px-4 py-2">{s.student_id}</td>
            <td className="border px-4 py-2">
              <ExamRubricModal examTitle={examTitle} rubric={rubric} student={s}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
