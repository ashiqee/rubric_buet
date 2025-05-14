// components/RubricsGrids.tsx
// This is a Server Component

import RubricCard from "./cards/RubricCard";
import RubricEditModal from "./modals/RubricEditModal";

export type Rubric = {
  _id: string;
  title: string;
  createdBy: string;
  criteria: {
    name: string;
    weight: number;
  }[];
  ratingLevels: {
    label: string;
    count: number;
    range: number[];
  }[];
  scores: Record<string, number>; // e.g., { "Conceptual Framework": 85, "Site Planning": 75 }
  totalScore: number;
  grade: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
 
};


export default async function RubricsGrids() {
  const res = await fetch("http://localhost:3000/api/rubrics", {
    cache: "no-store", // or 'force-cache' if you want caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rubrics");
  }

  const rubrics: Rubric[] = await res.json();

  return (
    <div className="">
     <RubricEditModal rubrics={rubrics}/>

    </div>
  );
}
