// components/RubricsGrids.tsx
// This is a Server Component

import RubricCard from "./cards/RubricCard";

type Rubric = {
  id: string;
  title: string;
  description?: string;
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
    <div className="grid grid-cols-1 md:grid-cols-3 my-6 lg:grid-cols-4 gap-4">
      {rubrics.map((rubric) => (
       <RubricCard rubric={rubric} key={rubric.id} />
      ))}
    </div>
  );
}
