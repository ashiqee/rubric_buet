'use client';

import { SetStateAction, useState } from 'react';
import Papa from 'papaparse';

import RubricForm from './RubricForm'; // Reuse previous RubricForm

type Student = {
  id: string;
  name: string;
  term: string;
  [key: string]: string;
};

export default function StudentUploader() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    Papa.parse<Student>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: SetStateAction<Student[]>; }) => {
        setStudents(results.data);
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Student CSV</h2>
      <input accept=".csv" className="mb-4" type="file" onChange={handleFileUpload} />

      {students.length > 0 && (
        <table className="w-full border text-sm mt-4">
          <thead>
            <tr className="">
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Term</th>
              <th className="border p-2">Rubric</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.term}</td>
                <td className="border p-2 text-center">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setSelectedStudent(student)}
                  >
                    Open Rubric
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show Rubric Form */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-6xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">
              Rubric Evaluation - {selectedStudent.name} - {selectedStudent.id}
            </h3>
            <RubricForm student={selectedStudent} />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
