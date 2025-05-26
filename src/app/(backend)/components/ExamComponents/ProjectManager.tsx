import { Project } from "@/types/models";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import AssessmentManager from "./AssessmentManager";

export default function ProjectManager({
  onChange,
}: {
  onChange: (projects: Project[]) => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = () => {
    setProjects([
      ...projects,
      { name: `Project-${projects.length + 1}`, assessments: [] },
    ]);
  };

  const updateProject = (index: number, updated: Project) => {
    const newProjects = [...projects];
    newProjects[index] = updated;
    setProjects(newProjects);
    onChange(newProjects);
  };

  return (
    <div className="space-y-4">
      <Button variant="bordered" size="sm" onPress={addProject}>Add Project +</Button>
      {projects.map((p, idx) => (
        <div key={idx} className="border p-2 space-y-3">
          <Input
            label="Project Name"
            className="border rounded-md"
            variant="underlined"
            value={p.name}
            onChange={(e) => {
              updateProject(idx, { ...p, name: e.target.value });
            }}
          />
          <AssessmentManager
            onChange={(assessments) => {
              updateProject(idx, { ...p, assessments });
            }}
          />
        </div>
      ))}
    </div>
  );
}
