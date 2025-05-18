"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useEffect, useState } from "react";

const courseTypes = ["Core Sessional", "Core Theory", "Optional Sessional"];
const programs = ["Undergraduate", "Postgraduate"];
const c_OfferTo = ["B.Arch", "M.Arch", "Ms.Arch"];
const groups = [
  "Level I, Term I",
  "Level I, Term II",
  "Level II, Term I",
  "Level II, Term II",
  "Level III, Term I",
  "Level III, Term II",
  "Level IV, Term I",
  "Level IV, Term II",
  "Level V, Term I",
  "Level V, Term II",
  "EE",
  "SYN",
  "UDL",
  "HTC",
  "HS",
  "CT",
];

export default function CourseEditForm({
  onClose,
  course,
}: {
  onClose: () => void;
  course: any;
}) {
  const [form, setForm] = useState({
    c_CourseTitle: "",
    c_CourseID: "",
    c_Group: "",
    c_CourseProgram: "",
    c_OfferTo: "",
    c_CourseType: "",
    c_Credits: "",
    c_CreditHours: "",
    c_Prerequisite: "",
  });

  // Sync course prop into local state
  useEffect(() => {
    if (course) {
      setForm(course);
    }
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!course._id) {
        alert("Missing course ID for update.");
        return;
      }

      const response = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Successfully updated course!");
      onClose();
    } catch (error) {
      console.error("Course update failed:", error);
      alert("Course update failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 p-4">
      <Input
        label="Course Title"
        name="c_CourseTitle"
        value={form.c_CourseTitle}
        onChange={handleChange}
        placeholder="Design Studio I"
      />
      <Input
        label="Course ID"
        name="c_CourseID"
        value={form.c_CourseID}
        onChange={handleChange}
        placeholder="ARCH 102"
      />

      <select
        name="c_Group"
        value={form.c_Group}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Group</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        name="c_CourseProgram"
        value={form.c_CourseProgram}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Program</option>
        {programs.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        name="c_OfferTo"
        value={form.c_OfferTo}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Offer To</option>
        {c_OfferTo.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <select
        name="c_CourseType"
        value={form.c_CourseType}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Course Type</option>
        {courseTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <Input
        label="Credits"
        name="c_Credits"
        value={form.c_Credits}
        onChange={handleChange}
        placeholder="6"
        type="number"
      />
      <Input
        label="Credit Hours"
        name="c_CreditHours"
        value={form.c_CreditHours}
        onChange={handleChange}
        placeholder="9 Hrs/WK"
      />
      <Textarea
        name="c_Prerequisite"
        value={form.c_Prerequisite}
        onChange={handleChange}
        placeholder="None"
        className="col-span-2"
      />

      <Button type="submit" className="col-span-2 w-full">
        Update Course
      </Button>
    </form>
  );
}
