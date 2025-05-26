'use client';

import { useState } from 'react';

const criteriaList = [
  { name: 'Conceptual Framework', weight: 30 },
  { name: 'Master Planning / Area Planning / Site planning', weight: 30 },
  { name: 'Form, Space & Functions', weight: 0 },
  { name: 'Project Specific Considerations', weight: 30 },
  { name: 'Craftsmanship and Communication (Visual & Verbal)', weight: 10 },
];

const ratingLevels = ['Excellent', 'Very Good', 'Good', 'Average', 'Below Average', 'Unacceptable'];

const RubricForm = ({student}:{student:any}) => {
  const [scores, setScores] = useState<Record<string, string>>({});

  const handleSelect = (criterion: string, level: string) => {
    setScores(prev => ({ ...prev, [criterion]: level }));
  };

  const calculateScore = () => {
    let total = 0;

    criteriaList.forEach(({ name, weight }) => {
      const level = scores[name];
      const multiplier = ratingLevels.indexOf(level); // Excellent = 0
      const ratingValue = 5 - multiplier; // Excellent = 5, Unacceptable = 0

      total += (ratingValue / 5) * weight;
    });

    return total.toFixed(2);
  };

  return (
    <form className="p-6  shadow rounded-xl space-y-6">
      <h2 className="text-xl font-bold">Rubric Evaluation Form</h2>

      <table className="w-full border text-sm">
        <thead>
          <tr className="">
            <th className="border p-2">Criteria</th>
            <th className="border p-2">Weightage</th>
            {ratingLevels.map(level => (
              <th key={level} className="border p-2 text-center">{level}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteriaList.map(({ name, weight }) => (
            <tr key={name}>
              <td className="border p-2">{name}</td>
              <td className="border p-2 text-center">{weight}%</td>
              {ratingLevels.map(level => (
                <td key={level} className="border p-2 text-center">
                  <input
                    checked={scores[name] === level}
                    name={name}
                    type="radio"
                    value={level}
                    onChange={() => handleSelect(name, level)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">
          Total Score: <span className="font-bold">{calculateScore()}</span>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            alert(`Submitted. Score: ${calculateScore()}`);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RubricForm;
