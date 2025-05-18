"use client"; // If you're using the app directory

import { useEffect, useState } from "react";
 import { FiEdit, FiTrash2 } from "react-icons/fi"; // Feather icons
import CourseEditModal from "../modals/courseModal/CourseEditModal";
import StudentDataEditModal from "../modals/StudentsModal/StudentDataEditModal";

type Student = {
  _id: string;
  student_id: string;
  name: string;
  email: string;
  mobile_no: string;
  department: string;
  level_term: string;
  admission_year: number;
  status: 'active' | 'graduated' | 'dropped';
};

export default function StudentsTable() {
  const [Students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/Students");
        if (!res.ok) throw new Error("Failed to fetch Students");
        const data = await res.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error("Error loading Students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = Students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerSearch) ||
        student.student_id.toLowerCase().includes(lowerSearch)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, Students]);



const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    const res = await fetch(`/api/Students/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete course");

    setStudents((prev) => prev.filter((course) => course._id !== id));
    setFilteredStudents((prev) => prev.filter((course) => course._id !== id));
    alert("Course deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete course");
  }
};



  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Students List</h2>

      <input
        type="text"
        placeholder="Search by Name or Student ID..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredStudents.length > 0 ? (
        <div className="overflow-x-auto h-[60vh]">
          <table className="min-w-full border text-sm text-left mt-4">
            <thead className="bg-gray-100">
              <tr>
               <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Dept</th>
            <th className="p-2 border">Level & Term</th>
            <th className="p-2 border">Term</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Status</th>
                <th className="px-3 py-2 border">Action</th>
              </tr>
            </thead>
       

<tbody>
  {filteredStudents.map((student, index) => (
    <tr key={index} className="even:bg-gray-50">
      <td className="px-3 py-2 border">{student.student_id}</td>
      <td className="px-3 py-2 border">{student.name}</td>
      <td className="px-3 py-2 border">{student.email}</td>
      <td className="px-3 py-2 border">{student.mobile_no}</td>
      <td className="px-3 py-2 border">{student.department}</td>
      <td className="px-3 py-2 border">{student.level_term}</td>
      <td className="px-3 py-2 border">{student.admission_year}</td>
      <td className="px-3 py-2 border">{student.status}</td>
      
      <td className="px-3 py-2 border">
        <div className="flex items-center space-x-2">
            <StudentDataEditModal course={course}/>
         
          <button
            onClick={() => handleDelete(student._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>


          </table>
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}
