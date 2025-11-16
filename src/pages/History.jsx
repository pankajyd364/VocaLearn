import React from 'react'
import { Link } from 'react-router-dom'

export default function History() {
  // mock history
  const sessions = [
    { id: 'sess1', lesson: 'Greetings', date: '2025-11-01', score: 82 },
    { id: 'sess2', lesson: 'Ordering Food', date: '2025-11-05', score: 74 }
  ]

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Practice History</h2>
      <div className="mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th>Lesson</th><th>Date</th><th>Score</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.lesson}</td>
                <td>{s.date}</td>
                <td>{s.score}</td>
                <td><Link to={`/results/${s.id}`} className="text-indigo-600 underline">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
