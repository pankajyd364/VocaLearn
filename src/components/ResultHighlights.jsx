import React from 'react'

export default function ResultHighlights({ result }) {
  if (!result) return null
  // result: { transcript, overallScore, phonemeIssues: [{word,index,issue}], grammarSuggestions: [] }
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Result</h3>
          <div className="text-sm text-gray-600">Score: <span className="font-medium">{result.overallScore ?? '—'}</span></div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-gray-600">Transcript</div>
        <div className="p-3 mt-1 bg-gray-50 rounded">
          {/* Highlight words with issues */}
          {result.wordDetails ? (
            result.wordDetails.map((w, idx) => (
              <span key={idx} className={w.issue ? 'bg-red-100 px-1 rounded mx-0.5' : 'mx-0.5'}>
                {w.text}
              </span>
            ))
          ) : (
            <div>{result.transcript}</div>
          )}
        </div>
      </div>

      {result.grammarSuggestions && result.grammarSuggestions.length > 0 && (
        <div className="mt-3">
          <div className="text-sm text-gray-600">Grammar suggestions</div>
          <ul className="list-disc list-inside text-sm">
            {result.grammarSuggestions.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
