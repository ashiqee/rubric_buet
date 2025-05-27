// components/RubricsGrids.tsx
// This is a Server Component

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
  const res = await fetch("https://rubric-buet.vercel.app/api/rubrics", {
    cache: "no-store", // or 'force-cache' if you want caching
    // next:{revalidate:2000}
  });
 
  if(!res?.ok){
    return <>No Created Rubric Template</>
  }
  const rubrics: Rubric[] = await res?.json();

  return (
    <>
      {!rubrics ? (
        <> No Created Rubric Template</>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 my-6 lg:grid-cols-4 gap-4">
          {rubrics?.map((rubric: Rubric) => (
            <div key={rubric._id} className="w-full">
              <RubricEditModal rubric={rubric} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
