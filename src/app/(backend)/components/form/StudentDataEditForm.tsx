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

export default function StudentDataEditForm({
  onClose,
  student,
}: {
  onClose: () => void;
  student: any;
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
    if (student) {
      setForm(student);
    }
  }, [student]);

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
      if (!student._id) {
        alert("Missing course ID for update.");

        return;
      }

      const response = await fetch(`/api/courses/${student._id}`, {
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
    <form className="grid grid-cols-2 gap-4 p-4" onSubmit={handleUpdate}>
      <Input
        label="Course Title"
        name="c_CourseTitle"
        placeholder="Design Studio I"
        value={form.c_CourseTitle}
        onChange={handleChange}
      />
      <Input
        label="Course ID"
        name="c_CourseID"
        placeholder="ARCH 102"
        value={form.c_CourseID}
        onChange={handleChange}
      />

      <select
        className="border p-2 rounded"
        name="c_Group"
        value={form.c_Group}
        onChange={handleChange}
      >
        <option value="">Select Group</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        name="c_CourseProgram"
        value={form.c_CourseProgram}
        onChange={handleChange}
      >
        <option value="">Select Program</option>
        {programs.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        name="c_OfferTo"
        value={form.c_OfferTo}
        onChange={handleChange}
      >
        <option value="">Offer To</option>
        {c_OfferTo.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        name="c_CourseType"
        value={form.c_CourseType}
        onChange={handleChange}
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
        placeholder="6"
        type="number"
        value={form.c_Credits}
        onChange={handleChange}
      />
      <Input
        label="Credit Hours"
        name="c_CreditHours"
        placeholder="9 Hrs/WK"
        value={form.c_CreditHours}
        onChange={handleChange}
      />
      <Textarea
        className="col-span-2"
        name="c_Prerequisite"
        placeholder="None"
        value={form.c_Prerequisite}
        onChange={handleChange}
      />

      <Button className="col-span-2 w-full" type="submit">
        Update Course
      </Button>
    </form>
  );
}
