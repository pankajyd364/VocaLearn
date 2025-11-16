import React from "react";
import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  return (
    <article className="p-4 rounded-lg border bg-white shadow-sm">
      <h3 className="font-semibold">{lesson.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{lesson.sentence}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/lesson/${lesson.id}`} className="text-indigo-600 text-sm">View</Link>
        <Link to={`/practice/${lesson.id}`} className="text-indigo-600 text-sm">Practice</Link>
      </div>
    </article>
  );
}
