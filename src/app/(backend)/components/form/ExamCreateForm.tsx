"use client";
import { Course, Project, Student } from '@/types/models';
import { useState } from 'react';
import CourseSelect from '../ExamComponents/CourseSelect';
import StudentSelect from '../ExamComponents/StudentSelect';
import ProjectManager from '../ExamComponents/ProjectManager';
import { Button } from '@heroui/button';


export default function CreateExam() {
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

 
const submit = async () => {
    const title = `${course?.c_CourseTitle} ${course?.c_CourseID} ${new Date().toLocaleDateString()}-Exam`;

  try {
    const response = await fetch('/api/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title || "Create Exam",
        course: course?._id, // Send only course ID
        students: students.map(s => s._id), // Array of student IDs
        projects: projects, // Array of project IDs
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Exam created successfully!');
      console.log(result);
    } else {
      alert('Failed to create exam');
      console.error(result);
    }
  } catch (error) {
    console.error(error);
    alert('Error occurred while creating exam.');
  }
};



  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Create Exam</h1>
      <CourseSelect onSelect={setCourse} />
      <StudentSelect onSelect={setStudents} />
      <ProjectManager onChange={setProjects} />
      <Button color="primary" onPress={submit}>Create Exam</Button>
    </div>
  );
}
