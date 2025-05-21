'use client';

import React, { useState, useEffect } from 'react';
import {
  Input, Select, SelectItem, Button, Card, CardHeader, CardBody
} from '@heroui/react';

type Course = { _id: string; c_CourseTitle: string };
type Rubric = { _id: string; title: string };
type StudentInfo = {
  student_id: string;
  name: string;
  level_term?: string;
};

export default function CreateExamForm() {
  const [studentIdsInput, setStudentIdsInput] = useState('');
  const [studentInfoList, setStudentInfoList] = useState<StudentInfo[]>([]);
  const [filteredYear, setFilteredYear] = useState('');
  const [availableStudentIds, setAvailableStudentIds] = useState<string[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedRubric, setSelectedRubric] = useState('');

  useEffect(() => {
    if (filteredYear) {
      fetch(`/api/students?admissionYear=${filteredYear}`)
        .then((res) => res.json())
        .then((data) => {
          const ids = data.map((s: any) => s.student_id);
          setAvailableStudentIds(ids);
        });
    }
  }, [filteredYear]);

  useEffect(() => {
    fetch('/api/courses').then((res) => res.json()).then(setCourses);
    fetch('/api/rubrics').then((res) => res.json()).then(setRubrics);
  }, []);

  const parseStudentIds = (text: string): string[] =>
    text.split(',').map((id) => id.trim()).filter((id) => id.length > 0);

  // 🔍 Fetch student details by entered IDs
  useEffect(() => {
    const ids = parseStudentIds(studentIdsInput);

    if (ids.length === 0) {
      setStudentInfoList([]);
      return;
    }

    fetch('/api/students/by-ids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((data) => setStudentInfoList(data))
      .catch((err) => {
        console.error('Failed to fetch student info', err);
        setStudentInfoList([]);
      });
  }, [studentIdsInput]);

  const handleSubmit = async () => {
    const parsedIds = parseStudentIds(studentIdsInput);

    if (!selectedCourse || !selectedRubric || parsedIds.length === 0) {
      alert('Please fill all fields and provide student IDs.');
      return;
    }

    const payload = {
      studentIds: parsedIds,
      courseId: selectedCourse,
      rubricId: selectedRubric,
    };

    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Exam created!');
    } else {
      const err = await res.json();
      alert('Error: ' + err.message);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <CardHeader className="text-xl font-bold">Create Exam</CardHeader>
      <CardBody className="flex flex-col gap-6">

        <Input
          label="Enter Student IDs (comma-separated)"
          placeholder="e.g. 2201001,2201002"
          value={studentIdsInput}
          onChange={(e) => setStudentIdsInput(e.target.value)}
        />

        {studentInfoList.length > 0 && (
          <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800">
            <strong>Matched Students:</strong>
            <ul className="mt-1 list-disc pl-5">
              {studentInfoList.map((s) => (
                <li key={s.student_id}>
                  {s.student_id} - {s.name} {s.level_term && `(Level-Term: ${s.level_term})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Select
          label="Filter by Admission Year"
          selectedKeys={filteredYear ? [filteredYear] : []}
          onChange={(e) => setFilteredYear(e.target.value)}
        >
          {[2020, 2021, 2022, 2023, 2024].map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </Select>

        {filteredYear && (
          <div className="text-sm text-gray-600">
            Found students: {availableStudentIds.join(', ') || 'None'}
          </div>
        )}

        <Select
          label="Select Course"
          selectedKeys={selectedCourse ? [selectedCourse] : []}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map((course) => (
            <SelectItem key={course._id} value={course._id}>
              {course.c_CourseTitle}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Select Rubric Template"
          selectedKeys={selectedRubric ? [selectedRubric] : []}
          onChange={(e) => setSelectedRubric(e.target.value)}
        >
          {rubrics.map((rubric) => (
            <SelectItem key={rubric._id} value={rubric._id}>
              {rubric.title}
            </SelectItem>
          ))}
        </Select>

        <Button color="primary" onClick={handleSubmit}>
          Create Exam
        </Button>
      </CardBody>
    </Card>
  );
}
