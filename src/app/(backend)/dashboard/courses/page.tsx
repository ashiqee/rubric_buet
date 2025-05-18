"use client";

import ImportCourseCSV from "../../components/imports/ImportCourseCSV";
import CourseCreateModal from "../../components/modals/courseModal/CourseCreateModal";
import CourseImportModal from "../../components/modals/courseModal/CourseimportModal";
import CoursesTable from "../../components/tables/CoursesTable";

export default function CoursesPage() {
  

  return (
   <div>
     <div className="p-4 flex gap-2">
      {/* Course creation modal */}
      <CourseCreateModal />

      {/* Import & Template Download */}
    
       <CourseImportModal/>
      
    
    </div>

    <CoursesTable/>
   </div>
  );
}
