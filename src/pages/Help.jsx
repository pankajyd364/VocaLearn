import React from 'react'

export default function Help() {
  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-semibold">Help & Troubleshooting</h2>
      <div className="mt-4 space-y-3 text-gray-600">
        <div>
          <strong>Microphone not working?</strong>
          <div>Check browser permission for microphone and allow it when prompted. If still blocked, go to browser settings and enable microphone for this site.</div>
        </div>
        <div>
          <strong>Audio analysis is slow</strong>
          <div>It may take a few seconds depending on server processing. We recommend keeping recordings short (2–6 seconds).</div>
        </div>
      </div>
    </div>
  )
}
