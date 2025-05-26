'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ExamStartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = searchParams.get('examId'); // Ensure your URL has ?examId=xxx

  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;

    const fetchExam = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        const data = await res.json();
        setExam(data);
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
          {project.assessments?.map((a: any) => (
            <div key={a._id} className="pl-4">
              <p><strong>Assessment:</strong> {a.name}</p>
              <p><strong>Rubric:</strong> {a.rubricId?.title || 'N/A'}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-4">Students</h2>
      <ul>
        {exam.students?.map((s: any) => (
          <li key={s._id}>
            {s.name} ({s.student_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
