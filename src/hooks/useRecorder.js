import { useRef, useState, useEffect } from 'react'

export default function useRecorder() {
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)
  const [duration, setDuration] = useState(0)
  const timerRef = useRef(null)
  const startTsRef = useRef(null)

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [audioUrl])

  async function start() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        // stop stream tracks
        stream.getTracks().forEach(t => t.stop())
        clearInterval(timerRef.current)
      }
      recorder.start()
      setIsRecording(true)
      startTsRef.current = Date.now()
      setDuration(0)
      timerRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTsRef.current) / 1000))
      }, 250)
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  function stop() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  function reRecord() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setAudioBlob(null)
    setError(null)
    setDuration(0)
  }

  function download(name = 'recording.webm') {
    if (!audioBlob) return
    const a = document.createElement('a')
    a.href = audioUrl
    a.download = name
    a.click()
  }

  return {
    isRecording,
    start,
    stop,
    reRecord,
    audioBlob,
    audioUrl,
    download,
    error,
    duration
  }
}
