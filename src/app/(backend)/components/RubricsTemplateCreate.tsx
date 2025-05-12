'use client';

import { useState } from 'react';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const defaultCriteria = [
  { name: 'Conceptual Framework', weight: 30 },
  { name: 'Site Planning', weight: 30 },
  { name: 'Project Specific', weight: 30 },
  { name: 'Craftsmanship & Communication', weight: 10 },
];

const defaultRatingLevels = [
  'Excellent',
  'Very Good',
  'Good',
  'Average',
  'Below Average',
  'Unacceptable',
];

export default function RubricForm() {
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [ratingLevels, setRatingLevels] = useState(defaultRatingLevels);
  const [scores, setScores] = useState<Record<string, string>>({});

  const handleSelect = (criterion: string, level: string) => {
    setScores(prev => ({ ...prev, [criterion]: level }));
  };

  const handleCriteriaChange = (index: number, field: 'name' | 'weight', value: string) => {
    const updated = [...criteria];
    if (field === 'weight') {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value;
    }
    setCriteria(updated);
  };

  const handleRatingChange = (index: number, value: string) => {
    const updated = [...ratingLevels];
    updated[index] = value;
    setRatingLevels(updated);
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 0 }]);
  };

  const removeCriterion = (index: number) => {
    const updated = [...criteria];
    updated.splice(index, 1);
    setCriteria(updated);
  };

  const addRatingLevel = () => {
    setRatingLevels([...ratingLevels, 'New Level']);
  };

  const removeRatingLevel = (index: number) => {
    if (ratingLevels.length <= 2) return alert('At least two rating levels are required.');
    const updated = [...ratingLevels];
    updated.splice(index, 1);
    setRatingLevels(updated);
  };

  const calculateScore = () => {
    let total = 0;
    criteria.forEach(({ name, weight }) => {
      const level = scores[name];
      const multiplier = ratingLevels.indexOf(level);
      const ratingValue = ratingLevels.length - 1 - multiplier; // Max rating = length - 1
      total += (ratingValue / (ratingLevels.length - 1)) * weight;
    });
    return total.toFixed(2);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold">Rubric Evaluation Form</h2>

      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Rating Levels:</h3>
        <button
          type="button"
          onClick={addRatingLevel}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add Rating
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ratingLevels.map((level, i) => (
          <div key={i} className="flex items-center gap-1">
            <input
              type="text"
              value={level}
              onChange={(e) => handleRatingChange(i, e.target.value)}
              className="border px-2 py-1 rounded"
            />
            {ratingLevels.length > 2 && (
              <button
                type="button"
                onClick={() => removeRatingLevel(i)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <table className="w-full border text-sm mt-4">
        <thead>
          <tr>
            <th className="border p-2">Criteria</th>
            <th className="border p-2">Weight</th>
            {ratingLevels.map((level, i) => (
              <th key={i} className="border p-2 text-center">{level}</th>
            ))}
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => handleCriteriaChange(i, 'name', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Criterion name"
                />
              </td>
              <td className="border p-2 text-center">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={c.weight}
                  onChange={(e) => handleCriteriaChange(i, 'weight', e.target.value)}
                  className="w-16 border px-1 py-1 rounded text-center"
                />
              </td>
              {ratingLevels.map(level => (
                <td key={level} className="border text-center">
                  <input
                    type="radio"
                    name={`criteria-${i}`}
                    value={level}
                    checked={scores[c.name] === level}
                    onChange={() => handleSelect(c.name, level)}
                  />
                </td>
              ))}
              <td className="border text-center">
                <button
                  type="button"
                  onClick={() => removeCriterion(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={addCriterion}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          <PlusIcon className="w-4 h-4" />
          Add Criterion
        </button>

        <div className="text-lg">
          Total Score: <span className="font-semibold">{calculateScore()}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          alert(`Submitted. Total Score: ${calculateScore()}`);
        }}
        className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Submit
      </button>
    </div>
  );
}
