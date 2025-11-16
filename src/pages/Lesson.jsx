import React from "react";
import { useParams, Link } from "react-router-dom";

const lessons = {
  1: { id: 1, title: "Greeting & Introductions", sentence: "Hello, my name is Alex. Nice to meet you." },
  2: { id: 2, title: "Asking for Directions", sentence: "Excuse me, could you tell me how to get to the train station?" },
  3: { id: 3, title: "Ordering Food", sentence: "I'd like a cup of coffee and a croissant, please." },
};

export default function Lesson() {
  const { id } = useParams();
  const lesson = lessons[id] || lessons[1];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <p className="text-gray-600 mt-2">{lesson.sentence}</p>
        </div>
        <div>
          <Link to={`/practice/${lesson.id}`} className="px-3 py-2 rounded bg-indigo-600 text-white">Practice</Link>
        </div>
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Notes</h3>
        <p className="text-sm text-gray-700 mt-2">This is a demo lesson page. Add vocabulary, examples, audio files, and tips here.</p>
      </section>
    </div>
  );
}
