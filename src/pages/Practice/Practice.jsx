import React from "react";
import { useParams } from "react-router-dom";
import VocaLearnPrototype from "../../components/VocaLearn-Frontend-Prototype";

export default function Practice() {
  const { id } = useParams();
  const lessonId = Number(id || 1);

  // If your prototype does not accept lessonId it's okay — it will use its internal sampleLessons
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Practice</h2>
      <div className="bg-white p-4 rounded shadow">
        <VocaLearnPrototype lessonId={lessonId} />
      </div>
    </div>
  );
}
