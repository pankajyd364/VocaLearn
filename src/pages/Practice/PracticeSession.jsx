import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Recorder from '../../components/Recorder/Recorder'
import Player from '../../components/Player'
import ResultHighlights from '../../components/ResultHighlights'
import Loader from '../../components/Loader'
import { submitPractice } from '../../services/practice.service'
import { fetchLessonById } from '../../services/lessons.service'

export default function PracticeSession() {
  const { lessonId } = useParams()
  const [audio, setAudio] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lesson, setLesson] = useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchLessonById(lessonId).then(setLesson)
  }, [lessonId])

  async function handleSubmit() {
    if (!audio || !audio.blob) {
      alert('Please record audio first')
      return
    }
    setLoading(true)
    try {
      const res = await submitPractice({ audioBlob: audio.blob, lessonId })
      setResult(res)
      // optionally navigate to a results page
      // navigate(`/results/${res.sessionId}`)
    } catch (err) {
      alert('Failed to submit practice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Practice: {lesson?.title ?? '...'}</h2>
        <p className="mt-2 text-gray-600">{lesson?.sentence ?? ''}</p>

        <div className="mt-4">
          <Recorder onRecorded={(r) => setAudio(r)} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Submit
          </button>
          <button onClick={() => { setResult(null) }} className="px-4 py-2 border rounded">Clear result</button>
          {loading && <Loader label="Analyzing audio..." />}
        </div>

        {result && (
          <div className="mt-6">
            <ResultHighlights result={result} />
            <div className="mt-3">
              <Player src={result.audioPlaybackUrl} />
            </div>
          </div>
        )}
      </div>

      <aside className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold">Tips</h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          <li>Speak clearly and don’t rush.</li>
          <li>Try to match the sentence rhythm.</li>
          <li>Use headphones to compare TTS vs your recording.</li>
        </ul>
      </aside>
    </div>
  )
}
