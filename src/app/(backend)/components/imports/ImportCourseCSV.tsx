"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type Course = {
  c_CourseTitle: string;
  c_CourseID: string;
  c_Group: string;
  c_CourseProgram: string;
  c_OfferTo: string;
  c_CourseType: string;
  c_Credits: string;
  c_CreditsHours: string;
  c_Prerequisite: string;
};

export default function ImportCourseCSV({onClose}:{onClose:any}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    Papa.parse<Course>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const seen = new Set<string>();
        const uniqueCourses = results.data.filter((course) => {
          const key = `${course.c_CourseID}-${course.c_CourseTitle}`;

          if (seen.has(key)) return false;
          seen.add(key);

          return true;
        });

        setCourses(uniqueCourses);
        console.log("Parsed unique courses:", uniqueCourses);
      },
    });
  };

 const handleImport = async () => {
  try {
    const responses = await Promise.all(
      courses.map((course) =>
        fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(course),
        })
      )
    );

    const results = await Promise.all(responses.map(res => res.json()));

    alert("Succesfully Imported Courses")
    console.log("Imported Courses:", results);
    onClose()
  } catch (error) {
    console.error("Import failed", error);
  }
};

  const sampleCSV = `c_CourseTitle,c_CourseID,c_Group,c_CourseProgram,c_OfferTo,c_CourseType,c_Credits,c_CreditHours,c_Prerequisite\n`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([sampleCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "course_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // ✅ Optional: Clean up the blob URL
  };

  return (
    <div className="p-4  border rounded-lg space-y-4 w-full ">
      <div className="relative">
      
        <div className="flex items-center justify-between">
          <p className="block text-sm font-medium mb-1">
            Upload CSV File
          </p>
          <div>
            <button
              className="text-sm text-blue-400 font-medium mb-1"
              onClick={handleDownloadTemplate}
            >
              Example CSV
            </button>
          </div>
        </div>

       
        <Input
          accept=".csv"
          className="file:bg-blue-500 file:text-white file:rounded file:px-4 file:py-1"
          type="file"
          onChange={handleFileUpload}
        />
        {fileName && (
          <p className="text-sm text-gray-500 mt-1">Selected: {fileName}</p>
        )}
      </div>

      {courses.length > 0 && (
        <>
          

          <div className="overflow-x-auto h-[60vh]">
            <table className="min-w-full border text-sm text-left mt-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Title</th>
                  <th className="px-3 py-2 border">ID</th>
                  <th className="px-3 py-2 border">Group</th>
                  <th className="px-3 py-2 border">Program</th>
                  <th className="px-3 py-2 border">Offer To</th>
                  <th className="px-3 py-2 border">Type</th>
                  <th className="px-3 py-2 border">Credits</th>
                  <th className="px-3 py-2 border">Credit Hours</th>
                  <th className="px-3 py-2 border">Prerequisite</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-3 py-2 border">{course.c_CourseTitle}</td>
                    <td className="px-3 py-2 border">{course.c_CourseID}</td>
                    <td className="px-3 py-2 border">{course.c_Group}</td>
                    <td className="px-3 py-2 border">
                      {course.c_CourseProgram}
                    </td>
                    <td className="px-3 py-2 border">{course.c_OfferTo}</td>
                    <td className="px-3 py-2 border">{course.c_CourseType}</td>
                    <td className="px-3 py-2 border">{course.c_Credits}</td>
                    <td className="px-3 py-2 border">
                      {course.c_CreditsHours}
                    </td>
                    <td className="px-3 py-2 border">
                      {course.c_Prerequisite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className=" w-full flex justify-end">
           <div className="space-y-2">
             <p className="text-sm">{courses.length} courses loaded.</p>
            <Button className="w-fit" onPress={handleImport}>
              Import Courses
            </Button>
           </div>
          </div>
        </>
      )}
    </div>
  );
}
