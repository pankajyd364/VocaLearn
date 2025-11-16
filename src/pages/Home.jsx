import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">Practice pronunciation with confidence</h1>
        <p className="mt-3 text-gray-600">VocaLearn helps you practice speaking by listening to your audio, transcribing it and giving immediate feedback.</p>

        <div className="mt-6 flex gap-3">
          <Link to="/lessons" className="px-4 py-2 bg-indigo-600 text-white rounded">Browse lessons</Link>
          <Link to="/help" className="px-4 py-2 border rounded">How it works</Link>
        </div>
      </div>

      <aside className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold">Quick start</h3>
        <ol className="mt-3 list-decimal list-inside text-sm text-gray-600">
          <li>Go to Lessons</li>
          <li>Open a lesson and click Practice</li>
          <li>Record your answer and submit</li>
        </ol>
      </aside>
    </div>
  )
}
