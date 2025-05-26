'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

import { fetchRubrics } from '../../lib/api';

import { Assessment, Rubric } from '@/types/models';

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
      <Button size="sm" variant="bordered"  onPress={addAssessment}>Add Assessment +</Button>

      {assessments.map((a, idx) => (
        <div key={idx} className="border p-4 rounded-md space-y-3 bg-white shadow-sm">
          <Input
            className='border rounded-md '
      
            label="Assessment Name"
            placeholder="e.g., Report, Jury, Prelli"
            value={a.name}
            variant='underlined'
            onChange={(e) =>
              updateAssessment(idx, { ...a, name: e.target.value })
            }
          />

          <div>
            {/* <label className="text-sm font-medium mb-1 inline-block">
              Select Rubric
            </label> */}
            <Select
              isClearable
              isSearchable
              options={rubricOptions}
              placeholder="Search and select a Rubric"
              value={rubricOptions.find((r) => r.value === a.rubricId) || null}
              onChange={(selected) =>
                updateAssessment(idx, {
                  ...a,
                  rubricId: selected?.value || '',
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
