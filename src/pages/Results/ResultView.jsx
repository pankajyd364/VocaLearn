import React from 'react'
import { useParams } from 'react-router-dom'
import ResultHighlights from '../../components/ResultHighlights'

// This page expects sessionId in URL. For demo, we read from local state or show placeholder.
export default function ResultView() {
  const { sessionId } = useParams()
  // In real app: fetch /api/sessions/:sessionId
  const demo = {
    transcript: 'Hello how are you',
    overallScore: 86,
    wordDetails: [{ text: 'Hello' }, { text: 'how' }, { text: 'are', issue: true }, { text: 'you' }],
    grammarSuggestions: ['Add a pause after Hello.']
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Result #{sessionId}</h2>
      <div className="mt-4">
        <ResultHighlights result={demo} />
      </div>
    </div>
  )
}
