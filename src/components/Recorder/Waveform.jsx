import React, { useEffect, useRef } from 'react'

export default function Waveform({ audioUrl, isRecording }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!audioUrl) {
      // placeholder wave
      ctx.fillStyle = '#f7fafc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#e2e8f0'
      for (let i = 0; i < 80; i++) {
        const h = Math.random() * canvas.height * 0.6
        ctx.fillRect((i * canvas.width) / 80, (canvas.height - h) / 2, 3, h)
      }
      return
    }

    // draw decoded waveform
    fetch(audioUrl)
      .then(r => r.arrayBuffer())
      .then(arrayBuffer => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        return audioCtx.decodeAudioData(arrayBuffer)
      })
      .then(buffer => {
        const data = buffer.getChannelData(0)
        const step = Math.ceil(data.length / canvas.width)
        const amp = canvas.height / 2
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#c7d2fe'
        for (let i = 0; i < canvas.width; i++) {
          let min = 1.0
          let max = -1.0
          for (let j = 0; j < step; j++) {
            const datum = data[i * step + j]
            if (datum < min) min = datum
            if (datum > max) max = datum
          }
          ctx.fillRect(i, (1 + min) * amp / 2, 1, Math.max(1, (max - min) * amp))
        }
      })
      .catch(() => {
        // fall back to placeholder
      })
  }, [audioUrl, isRecording])

  return <canvas ref={canvasRef} className="wave-canvas mt-3" width="800" height="120" />
}
