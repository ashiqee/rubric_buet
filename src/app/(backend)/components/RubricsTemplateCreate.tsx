"use client";

import { useState } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const defaultCriteria = [
  { name: "Conceptual Framework", weight: 30 },
  { name: "Site Planning", weight: 30 },
  { name: "Project Specific", weight: 30 },
  { name: "Craftsmanship & Communication", weight: 10 },
];

const defaultRatingLevels = [
  { label: "Excellent", count: 3, range: [100, 90, 80] },
  { label: "Very Good", count: 2, range: [79, 70] },
  { label: "Good", count: 2, range: [69, 60] },
  { label: "Average", count: 1, range: [50] },
  { label: "Below Average", count: 1, range: [40] },
  { label: "Unacceptable", count: 2, range: [39, 0] },
];

const ratingColors = [
  "bg-green-600 text-white",
  "bg-cyan-500 text-white",
  "bg-blue-500 text-white",
  "bg-yellow-400 text-black",
  "bg-amber-500 text-white",
  "bg-rose-600 text-white",
];

export default function RubricForm() {
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [ratingLevels, setRatingLevels] = useState(defaultRatingLevels);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleSelect = (criterion: string, value: number) => {
    setScores((prev) => ({ ...prev, [criterion]: value }));
  };

const handleCriteriaChange = (
  index: number,
  field: "name" | "weight",
  value: string
) => {
  const updated = [...criteria];
  if (field === "weight") {
    updated[index].weight = Number(value);
  } else {
    updated[index].name = value;
  }
  setCriteria(updated);
};


  const handleRatingChange = (index: number, value: string) => {
    const updated = [...ratingLevels];
    updated[index].label = value;
    setRatingLevels(updated);
  };

  const handleRangeValueChange = (
    levelIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    const updated = [...ratingLevels];
    updated[levelIndex].range[valueIndex] = Number(newValue);
    setRatingLevels(updated);
  };

  const handleCountChange = (index: number, newCountStr: string) => {
    const newCount = Number(newCountStr);
    if (isNaN(newCount) || newCount <= 0) return;

    const updated = [...ratingLevels];
    const existing = updated[index];
    const oldRange = existing.range;

    // Adjust range length to match count
    const newRange =
      newCount > oldRange.length
        ? [...oldRange, ...Array(newCount - oldRange.length).fill(0)]
        : oldRange.slice(0, newCount);

    updated[index] = {
      ...existing,
      count: newCount,
      range: newRange,
    };

    setRatingLevels(updated);
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: "", weight: 0 }]);
  };

  const removeCriterion = (index: number) => {
    const updated = [...criteria];
    updated.splice(index, 1);
    setCriteria(updated);
  };

  const addRatingLevel = () => {
    setRatingLevels([
      ...ratingLevels,
      {
        label: `New Level ${ratingLevels.length + 1}`,
        count: 1,
        range: [0],
      },
    ]);
  };

  const removeRatingLevel = (index: number) => {
    if (ratingLevels.length <= 2)
      return alert("At least two rating levels are required.");

    const updated = [...ratingLevels];
    updated.splice(index, 1);
    setRatingLevels(updated);

    // Clean up scores
    const cleanedScores = Object.fromEntries(
      Object.entries(scores).map(([k, v]) =>
        updated.some((r) => r.range.includes(v)) ? [k, v] : [k, 0]
      )
    );
    setScores(cleanedScores);
  };

  const calculateScore = () => {
    let total = 0;
    criteria.forEach(({ name, weight }) => {
      const value = scores[name];
      total += (value / 100) * weight;
    });
    return total.toFixed(2);
  };

  const getLetterGrade = (score: number) => {
    if (score >= 80) return "A+";
    if (score >= 75) return "A";
    if (score >= 70) return "A-";
    if (score >= 65) return "B+";
    if (score >= 60) return "B";
    if (score >= 55) return "B-";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    return "F";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6 overflow-auto">
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
          <div key={i} className="border p-2 rounded space-y-2 ">
            <div className="flex  items-center gap-2">
              <input
                type="text"
                value={level.label}
                onChange={(e) => handleRatingChange(i, e.target.value)}
                className="border 2xl:w-48 px-2 py-1 rounded"
                placeholder="Label"
              />
              <input
                type="number"
                min={1}
                value={level.count}
                onChange={(e) => handleCountChange(i, e.target.value)}
                className="w-16 border px-2 py-1 rounded"
                placeholder="Count"
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

            <div className="flex items-center flex-wrap gap-2">
              Range:
              {level.range.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  value={val}
                  onChange={(e) => handleRangeValueChange(i, j, e.target.value)}
                  className="w-16 border px-2 py-1 rounded"
                  placeholder="Range"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Criteria</th>
            <th className="border p-2 bg-gray-100">Weight</th>
            {ratingLevels.map((level, i) => (
              <th
                key={level.label}
                className={`border p-2 text-center ${ratingColors[i % ratingColors.length]}`}
              >
                {level.label}
              </th>
            ))}
            <th className="border p-2 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) =>
                    handleCriteriaChange(i, "name", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleCriteriaChange(i, "weight", e.target.value)
                  }
                  className="w-16 border px-1 py-1 rounded text-center"
                />
              </td>

              {ratingLevels.map((level, j) => (
                <td key={j} className="border text-center">
                  <div className="flex justify-center gap-1">
                    {level.range.map((val, k) => (
                      <label
                        key={val}
                        className={`inline-block w-5 h-5 rounded cursor-pointer border-2 ${
                          scores[c.name] === val
                            ? `${ratingColors[j % ratingColors.length]} border-black`
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`criteria-${i}`}
                          value={val}
                          checked={scores[c.name] === val}
                          onChange={() => handleSelect(c.name, val)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
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
          Total Score:{" "}
          <span className="font-semibold">
            {Number(calculateScore()).toFixed(2)}
          </span>{" "}
          &nbsp; | Grade:{" "}
          <span className="font-semibold">
            {getLetterGrade(Number(calculateScore()))}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          alert(
            `Submitted.\nTotal Score: ${Number(calculateScore()).toFixed(2)}\nGrade: ${getLetterGrade(Number(calculateScore()))}`
          );
        }}
        className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Submit
      </button>
    </div>
  );
}
