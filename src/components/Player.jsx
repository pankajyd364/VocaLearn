import React from 'react'

export default function Player({ src }) {
  if (!src) return null
  return (
    <div className="mt-3">
      <audio controls src={src} className="w-full" />
    </div>
  )
}
