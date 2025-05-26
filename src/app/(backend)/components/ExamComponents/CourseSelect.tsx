"use client";

import { useState, useEffect } from 'react';
import Select from 'react-select';

import { fetchCourses } from '../../lib/api';

import { Course } from '@/types/models';

interface CourseOption {
  label: string;
  value: string;
  data: Course;
}

export default function CourseSelect({ onSelect }: { onSelect: (course: Course) => void }) {
  const [options, setOptions] = useState<CourseOption[]>([]);

  useEffect(() => {
    fetchCourses().then((courses) => {
      const mapped = courses.map((course) => ({
        label: `${course.c_CourseTitle} (${course.c_CourseID})`,
        value: course._id,
        data: course
      }));

      setOptions(mapped);
    });
  }, []);

  return (
    <Select
   
      isClearable
      isSearchable
      options={options}
      placeholder="Select Course"
      onChange={(selected) => {
        if (selected) onSelect((selected as CourseOption).data);
      }}
    />
  );
}
