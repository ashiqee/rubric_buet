export default function RubricCard({rubric}:{rubric:any}) {
    return (
         <div
         
          className="border rounded-xl w-full  p-4 h-44 shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{rubric.title}</h3>
          {rubric.description && (
            <p className="text-sm text-gray-600 mt-1">{rubric.description}</p>
          )}
        </div>
    );
}