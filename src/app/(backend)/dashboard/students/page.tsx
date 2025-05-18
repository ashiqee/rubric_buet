"use client";

import ImportCourseCSV from "../../components/imports/ImportCourseCSV";
import CourseCreateModal from "../../components/modals/courseModal/CourseCreateModal";
import CourseImportModal from "../../components/modals/courseModal/CourseimportModal";
import StudentAddModal from "../../components/modals/StudentsModal/StudentAddModal";
import StudentDataImportModal from "../../components/modals/StudentsModal/StudentDataimportModal";
import CoursesTable from "../../components/tables/CoursesTable";
import StudentsTable from "../../components/tables/StudentsTable";

export default function StudentsPage() {
  

  return (
   <div>
     <div className="p-4 flex gap-2">
      {/* Student creation modal */}
      <StudentAddModal />

      {/* Import & Template Download */}
    
       <StudentDataImportModal/>
      
    
    </div>

    <StudentsTable/>
   </div>
  );
}
