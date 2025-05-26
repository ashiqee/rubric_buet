"use client"; // If you're using the app directory

import { useEffect, useState } from "react";
 import { FiEdit, FiTrash2 } from "react-icons/fi"; // Feather icons

import CourseEditModal from "../modals/courseModal/CourseEditModal";

type Course = {
    _id:string;
  c_CourseTitle: string;
  c_CourseID: string;
  c_Group: string;
  c_CourseProgram: string;
  c_OfferTo: string;
  c_CourseType: string;
  c_Credits: string;
  c_CreditHours: string;
  c_Prerequisite: string;
};

export default function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");

        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.c_CourseTitle.toLowerCase().includes(lowerSearch) ||
        course.c_CourseID.toLowerCase().includes(lowerSearch)
    );

    setFilteredCourses(filtered);
  }, [searchTerm, courses]);



  const handleEdit = (course: Course) => {
  // You can open a modal or redirect to an edit page with course data
 
  <><CourseEditModal course={course}/></>
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete course");

    setCourses((prev) => prev.filter((course) => course._id !== id));
    setFilteredCourses((prev) => prev.filter((course) => course._id !== id));
    alert("Course deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete course");
  }
};



  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Course List</h2>

      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search by title or ID..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredCourses.length > 0 ? (
        <div className="overflow-x-auto h-[60vh]">
          <table className="min-w-full border text-sm text-left mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Title</th>
                <th className="px-3 py-2 border">Code</th>
                <th className="px-3 py-2 border">Group / Divison</th>
                <th className="px-3 py-2 border">Program</th>
                <th className="px-3 py-2 border">Offer To</th>
                <th className="px-3 py-2 border">Type</th>
                <th className="px-3 py-2 border">Credits</th>
                <th className="px-3 py-2 border">Credit Hours</th>
                <th className="px-3 py-2 border">Prerequisite</th>
                <th className="px-3 py-2 border">Action</th>
              </tr>
            </thead>
       

<tbody>
  {filteredCourses.map((course, index) => (
    <tr key={index} className="even:bg-gray-50">
      <td className="px-3 py-2 border">{course.c_CourseTitle}</td>
      <td className="px-3 py-2 border">{course.c_CourseID}</td>
      <td className="px-3 py-2 border">{course.c_Group}</td>
      <td className="px-3 py-2 border">{course.c_CourseProgram}</td>
      <td className="px-3 py-2 border">{course.c_OfferTo}</td>
      <td className="px-3 py-2 border">{course.c_CourseType}</td>
      <td className="px-3 py-2 border">{course.c_Credits}</td>
      <td className="px-3 py-2 border">{course.c_CreditHours}</td>
      <td className="px-3 py-2 border">{course.c_Prerequisite}</td>
      <td className="px-3 py-2 border">
        <div className="flex items-center space-x-2">
            <CourseEditModal course={course}/>
         
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete"
            onClick={() => handleDelete(course._id)}
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
