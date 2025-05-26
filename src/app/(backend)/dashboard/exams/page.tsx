'use client';

import { Button } from "@heroui/button";
import { useState } from "react";
import CreateExamForm from "../../components/form/ExamCreateForm";
import ExamListPage from "../../components/ExamComponents/ExamList";



export default function Exams() {
  const [view, setView] = useState<'exam-list' | 'create-exam' | 'exam-pending' | 'exam-complete'>('exam-list');

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button onPress={() => setView('exam-list')}>Exam List</Button>
        <Button onPress={() => setView('create-exam')}>Create New Exam</Button>
        
       
      </div>

      <div>
        {view === 'exam-list' && <ExamListPage />}
        {view === 'create-exam' && <CreateExamForm />}
        {/* {view === 'exam-pending' && <ExamPending />}
        {view === 'exam-complete' && <ExamComplete />} */}
      </div>
    </div>
  );
}
