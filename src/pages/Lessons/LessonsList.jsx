import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLessons } from '../../services/lessons.service'

export default function LessonsList() {
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    fetchLessons().then(setLessons)
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lessons</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map(l => (
          <div key={l.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{l.title}</h3>
                <div className="text-sm text-gray-500">{l.difficulty}</div>
              </div>
              <Link to={`/lessons/${l.id}`} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Open</Link>
            </div>
            <p className="mt-3 text-gray-600 text-sm">{l.sentence}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
