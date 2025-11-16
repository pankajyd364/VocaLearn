import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchLessonById } from '../../services/lessons.service'

export default function LessonDetail() {
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    fetchLessonById(lessonId).then(setLesson)
  }, [lessonId])

  if (!lesson) return <div>Loading...</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold">{lesson.title}</h2>
      <p className="mt-3 text-gray-700 text-lg">{lesson.sentence}</p>

      <div className="mt-5 flex gap-3">
        <Link to={`/practice/${lesson.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded">Practice</Link>
        <button className="px-4 py-2 border rounded">View hints</button>
      </div>
    </div>
  )
}
