"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type Student = {
  _id?: string;
  student_id: string;
  name: string;
  email: string;
  mobile_no: string;
  department: string;
  level_term?: string;
  admission_year: number;
  status: 'active' | 'graduated' | 'dropped';
};

export default function ImportStudentsCSV({ onClose }: { onClose: () => void }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse<Student>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const seen = new Set<string>();
        const uniqueStudents = results.data.filter((student) => {
          const key = student.student_id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setStudents(uniqueStudents);
        console.log("Parsed unique students:", uniqueStudents);
      },
    });
  };

  const handleImport = async () => {
    try {
      const responses = await Promise.all(
        students.map((student) =>
          fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
          })
        )
      );

      const results = await Promise.all(responses.map((res) => res.json()));
      alert("Successfully Imported Students");
      console.log("Imported Students:", results);
      onClose();
    } catch (error) {
      console.error("Import failed", error);
    }
  };

  const sampleCSV = `student_id,name,email,mobile_no,department,level_term,admission_year,status\n2023001,John Doe,john@example.com,01234567890,CSE,Level 1 Term 1,2023,active\n`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([sampleCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "student_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border rounded-lg space-y-4 w-full">
      <div className="relative">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium mb-1">Upload CSV File</label>
          <button
            onClick={handleDownloadTemplate}
            className="text-sm text-blue-400 font-medium mb-1"
          >
            Example CSV
          </button>
        </div>

        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file:bg-blue-500 file:text-white file:rounded file:px-4 file:py-1"
        />
        {fileName && (
          <p className="text-sm text-gray-500 mt-1">Selected: {fileName}</p>
        )}
      </div>

      {students.length > 0 && (
        <>
          <div className="overflow-x-auto h-[60vh]">
            <table className="min-w-full border text-sm text-left mt-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Student ID</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Email</th>
                  <th className="px-3 py-2 border">Mobile</th>
                  <th className="px-3 py-2 border">Department</th>
                  <th className="px-3 py-2 border">Level/Term</th>
                  <th className="px-3 py-2 border">Year</th>
                  <th className="px-3 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-3 py-2 border">{student.student_id}</td>
                    <td className="px-3 py-2 border">{student.name}</td>
                    <td className="px-3 py-2 border">{student.email}</td>
                    <td className="px-3 py-2 border">{student.mobile_no}</td>
                    <td className="px-3 py-2 border">{student.department}</td>
                    <td className="px-3 py-2 border">{student.level_term}</td>
                    <td className="px-3 py-2 border">{student.admission_year}</td>
                    <td className="px-3 py-2 border">{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end">
            <div className="space-y-2">
              <p className="text-sm">{students.length} students loaded.</p>
              <Button className="w-fit" onPress={handleImport}>
                Import Students
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
