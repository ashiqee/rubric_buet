'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@heroui/button';
import RubricCreateModal from '@/app/(backend)/components/modals/RubricCreateModal';
import RubricEditModal from '@/app/(backend)/components/modals/RubricEditModal';
import ExamModal from '@/app/(backend)/components/modals/ExamModal/ExamModal';

export default function ExamStartPage() {
  const router = useRouter();
  const params = useParams()
  
  const examId = params.examId; // Ensure your URL has ?examId=xxx

  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  

  useEffect(() => {
    if (!examId) return;

    const fetchExam = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        const data = await res.json();
        setExam(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found.</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{exam.course?.c_CourseTitle}</h1>
      <p><strong>Course ID:</strong> {exam.course?.c_CourseID}</p>
      <p><strong>Group:</strong> {exam.course?.c_Group}</p>

      <h2 className="text-xl font-semibold mt-4">Projects</h2>
      {exam.projects?.map((project: any) => (
        <div key={project._id} className="border p-2 rounded">
          <h3 className="font-semibold">{project.name}</h3>
     <div className='my-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid justify-between gap-6'>
             {project.assessments?.map((a: any) => (
            <div key={a._id} className=" shadow-sm border hover:bg-gray-100/45 border-spacing-0.5 p-3 rounded-md flex justify-between items-center">
              <div>
                <p><strong>Assessment:</strong> {a.name}</p>
              <p><strong>Rubric:</strong> {a.rubricId?.title || 'N/A'}</p>
              </div>

<ExamModal examTitle={`${exam.course?.c_CourseTitle}-${a.name}`} rubric={a.rubricId} students={exam.students}/>
             
            </div>
          ))}
     </div>
        </div>
      ))}

     
    </div>
  );
}
