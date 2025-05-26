"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Student } from "@/types/models";
import { fetchStudents } from "../../lib/api";

const animatedComponents = makeAnimated();

type StudentOption = {
  value: string;
  label: string;
  data: Student;
};

export default function StudentSelect({
  onSelect,
}: {
  onSelect: (students: Student[]) => void;
}) {
  const [ids, setIds] = useState<string>("");
  const [year, setYear] = useState<number | "">("");
  const [studentOptions, setStudentOptions] = useState<StudentOption[]>([]);

  const search = async () => {
    const students = await fetchStudents({
      ids: ids ? ids.split(",").map((id) => id.trim()) : undefined,
      year: year ? Number(year) : undefined,
    });

    const options = students.map((student) => ({
      value: student._id,
      label: `${student.student_id} - ${student.name} (${student.level_term || "N/A"})`,
      data: student,
    }));

    setStudentOptions(options);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
     
        <input
          className="border p-2 rounded w-fit"
          placeholder="Admission Year (Batch)"
          value={year.toString()}
          onChange={(e) =>
            setYear(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={search}
        >
          Student Data Fetch
        </button>

        
      </div>
{
          studentOptions.length > 0 && <p className="text-gray-400">Get {studentOptions.length} Student Data</p>
        }
      <Select<StudentOption, true>
        isMulti
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={studentOptions}
        placeholder="Select Students"
        onChange={(selected) => {
          if (selected) {
            const selectedStudents = selected.map((s) => s.data);
            onSelect(selectedStudents);
          } else {
            onSelect([]);
          }
        }}
      />
    </div>
  );
}
