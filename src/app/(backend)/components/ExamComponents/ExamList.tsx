"use client";

import { useEffect, useState } from "react";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";

type Exam = {
  _id: string;
  title:string;
  course: {
    c_CourseTitle: string;
    c_CourseID: string;
  };
  students: {
    _id: string;
    name: string;
  }[];
  projects: {
    name: string;
    assessments: {
      name: string;
      rubric: {
        title: string;
      };
    }[];
  }[];
  createdAt: string;
};

export default function ExamListPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  console.log(exams);
  

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Exam List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams?.map((exam) => (
            <Card key={exam._id}>
              <CardBody className="space-y-2 p-4">
                {/* <h2 className="font-semibold">
                  {exam.course?.c_CourseTitle} ({exam.course?.c_CourseID})
                </h2>
                <p className="text-sm text-gray-600">
                  {exam.students.length} students | {exam.projects.length} projects
                </p>
                <ul className="list-disc ml-4">
                  {exam.projects.map((p, i) => (
                    <li key={i}>
                      <strong>{p.name}</strong>
                      <ul className="list-disc ml-4 text-sm text-gray-500">
                        {p.assessments.map((a, j) => (
                          <li key={j}>
                            {a.name} - {a.rubric?.title || "No rubric"}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul> */}
                <h2>{exam.title}</h2>
                <p className="text-xs text-gray-400">
                  Created on: {new Date(exam.createdAt).toLocaleString()}
                </p>
                <Button onPress={()=>router.push(`exams/${exam._id}`)} size="sm">Start Exam</Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
