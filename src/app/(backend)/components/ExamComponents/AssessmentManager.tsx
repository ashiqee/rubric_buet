'use client';

import { Assessment, Rubric } from '@/types/models';
import { useEffect, useState } from 'react';
import { fetchRubrics } from '../../lib/api';
import Select from 'react-select';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

interface OptionType {
  value: string;
  label: string;
}

export default function AssessmentManager({
  onChange,
}: {
  onChange: (assessments: Assessment[]) => void;
}) {
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetchRubrics().then(setRubrics);
  }, []);

  const addAssessment = () => {
    setAssessments((prev) => [...prev, { name: '', rubricId: '' }]);
  };

  const updateAssessment = (index: number, updated: Assessment) => {
    const newList = [...assessments];
    newList[index] = updated;
    setAssessments(newList);
    onChange(newList);
  };

  // Transform rubrics into react-select options
  const rubricOptions: OptionType[] = rubrics.map((r) => ({
    value: r._id,
    label: r.title,
  }));

  return (
    <div className="space-y-4">
      <Button variant="bordered" size="sm"  onPress={addAssessment}>Add Assessment +</Button>

      {assessments.map((a, idx) => (
        <div key={idx} className="border p-4 rounded-md space-y-3 bg-white shadow-sm">
          <Input
            label="Assessment Name"
      
            placeholder="e.g., Report, Jury, Prelli"
            className='border rounded-md '
            variant='underlined'
            value={a.name}
            onChange={(e) =>
              updateAssessment(idx, { ...a, name: e.target.value })
            }
          />

          <div>
            {/* <label className="text-sm font-medium mb-1 inline-block">
              Select Rubric
            </label> */}
            <Select
              placeholder="Search and select a Rubric"
              options={rubricOptions}
              value={rubricOptions.find((r) => r.value === a.rubricId) || null}
              onChange={(selected) =>
                updateAssessment(idx, {
                  ...a,
                  rubricId: selected?.value || '',
                })
              }
              isClearable
              isSearchable
            />
          </div>
        </div>
      ))}
    </div>
  );
}
