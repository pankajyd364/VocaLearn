import React, { useState } from 'react'

export default function Profile() {
  const [name, setName] = useState('Demo User')
  const [ttsVoice, setTtsVoice] = useState('alloy')

  function save() {
    alert('Saved (mock)')
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm text-gray-600">Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">TTS voice</label>
          <select value={ttsVoice} onChange={e => setTtsVoice(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="alloy">Alloy (female)</option>
            <option value="zen">Zen (male)</option>
          </select>
        </div>
        <div>
          <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
