"use client";

import { useState } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@heroui/input";

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

export default function RubricTemplateForm({onClose}:{onClose:any}) {
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [title, setTitle] = useState("Create New Rubric Template");
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


  const handleTitleSet = (value: string) => {
    setTitle(value)
    
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
  const rangeValue = Number(newValue);

  if (isNaN(rangeValue)) return;

  const level = updated[levelIndex];
  const newRange = [...level.range];

  newRange[valueIndex] = rangeValue;
  updated[levelIndex] = {
    ...level,
    range: newRange,
    count: newRange.length, // sync count to actual range length
  };

  

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
    const value = scores[name]; // Might be undefined

    if (typeof value === "number") {
      total += (value / 100) * weight;
    } else {
      console.warn(`No score selected for ${name}`);
    }
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


  const handleSaveRubric = async () => {
  const rubricData = {
    criteria,
    ratingLevels,
    scores,
    totalScore: Number(calculateScore()),
    grade: getLetterGrade(Number(calculateScore())),
    createdBy: "663eb8cf58ef0c7c67aa172b", // Replace this with the actual logged-in user ID
    title: title
  };

  try {
    const res = await fetch("/api/rubrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rubricData),
    });

    if (!res.ok) throw new Error("Failed to save rubric");

    const data = await res.json();

    alert("Rubric saved successfully!");
    console.log("Saved rubric:", data);
  } catch (error) {
    console.error("Save error:", error);
    alert("Error saving rubric");
  }
};

  
  return (
    <div className="p-6  rounded-xl shadow space-y-6 overflow-auto">
      <h2 className="text-2xl font-bold">Rubric Evaluation Form</h2>

      <div className="space-y-2">
      <label className="block text-lg font-semibold text-gray-700" htmlFor="rubric-title">
        Rubric Title
      </label>
      <input
        className="border w-full px-2 py-1 rounded"
        id="rubric-title"
        name="Title"
        placeholder="Enter rubric title"
         type="text"
        value={title}
        onChange={(e) => handleTitleSet(e.target.value)}
      />
    </div>

      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Rating Levels:</h3>
        <button
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          type="button"
          onClick={addRatingLevel}
        >
          <PlusIcon className="w-4 h-4" />
          Add Rating
        </button>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-3 flex-wrap gap-2">
        {ratingLevels.map((level, i) => (
          <div key={i} className="border p-2 rounded space-y-2 ">
            <div className="flex  items-center gap-2">
              <input
                className="border md:w-40 2xl:w-44 px-2 py-1 rounded"
                placeholder="Label"
                type="text"
                value={level.label}
                onChange={(e) => handleRatingChange(i, e.target.value)}
              />
              <input
                className="w-16 border px-2 py-1 rounded"
                min={1}
                placeholder="Count"
                type="number"
                value={level.count}
                onChange={(e) => handleCountChange(i, e.target.value)}
              />
              {ratingLevels.length > 2 && (
                <button
                  className="text-red-500 hover:text-red-700"
                  type="button"
                  onClick={() => removeRatingLevel(i)}
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
                  className="w-16 border px-2 py-1 rounded"
                  min={0}
                  placeholder="Range"
                  type="number"
                  value={val}
                  onChange={(e) => handleRangeValueChange(i, j, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr>
            <th className="border p-2 light:bg-gray-100">Criteria</th>
            <th className="border p-2 light:bg-gray-100">Weight</th>
            {ratingLevels.map((level, i) => (
              <th
                key={level.label}
                className={`border p-2 text-center ${ratingColors[i % ratingColors.length]}`}
              >
                {level.label}
              </th>
            ))}
            <th className="border p-2 bg-gray-100" />
          </tr>
        </thead>
        <tbody>
          {criteria.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Criterion name"
                  type="text"
                  value={c.name}
                  onChange={(e) =>
                    handleCriteriaChange(i, "name", e.target.value)
                  }
                />
              </td>
              <td className="border p-2 text-center">
                <input
                  className="w-16 border px-1 py-1 rounded text-center"
                  max={100}
                  min={0}
                  type="number"
                  value={c.weight}
                  onChange={(e) =>
                    handleCriteriaChange(i, "weight", e.target.value)
                  }
                />
              </td>

             {ratingLevels.map((level, j) => (
  <td key={j} className="border text-center">
    <div className="flex justify-center gap-1">
      {level.range.map((val, k) => {
        const key = `level-${j}-val-${val}-${k}`; // ensure stable unique key

        return (
          <label
  key={val}
  aria-label={`Select rating ${val} for ${c.name}`}
  className={`inline-block w-5 h-5 rounded cursor-pointer border-2 ${
    scores[c.name] === val
      ? `${ratingColors[j % ratingColors.length]} border-black`
      : "border-gray-300"
  }`}
>
  <input
    checked={scores[c.name] === val}
    className="sr-only"
    name={`criteria-${i}`}
    type="radio"
    value={val}
    onChange={() => handleSelect(c.name, val)}
  />
</label>

        );
      })}
    </div>
  </td>
))}


              <td className="border text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  type="button"
                  onClick={() => removeCriterion(i)}
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
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          type="button"
          onClick={addCriterion}
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

      {/* <button
        onClick={(e) => {
          e.preventDefault();
          alert(
            `Submitted.\nTotal Score: ${Number(calculateScore()).toFixed(2)}\nGrade: ${getLetterGrade(Number(calculateScore()))}`
          );
        }}
        className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Submit
      </button> */}
<div className="flex justify-end">
    
      <button
  className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
  onClick={(e) => {
    e.preventDefault();
    handleSaveRubric(); // call save handler
    onClose()
  }}
>
  Submit
</button>
</div>

    </div>
  );
}
