import React from 'react'

export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-400" />
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
