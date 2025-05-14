"use client";

import ImportCourseCSV from "../../components/imports/ImportCourseCSV";
import CourseCreateModal from "../../components/modals/courseModal/CourseCreateModal";

export default function CoursesPage() {
  

  return (
    <div className="p-4 space-y-4">
      {/* Course creation modal */}
      <CourseCreateModal />

      {/* Import & Template Download */}
      <div className=" flex gap-3 items-center">
        <ImportCourseCSV />
      
      </div>
    </div>
  );
}
