// This is a mock. Replace with a real POST to your backend.
export async function submitPractice({ audioBlob, lessonId }) {
  // simulate upload time
  await new Promise(r => setTimeout(r, 1200))

  // pretend server processed and returns a result
  return {
    sessionId: String(Date.now()),
    transcript: 'Hello how are you',
    overallScore: Math.floor(70 + Math.random() * 25),
    wordDetails: [
      { text: 'Hello', issue: false },
      { text: 'how', issue: false },
      { text: 'are', issue: true },
      { text: 'you', issue: false }
    ],
    grammarSuggestions: ['Consider pausing slightly after "Hello."'],
    audioPlaybackUrl: audioBlob ? URL.createObjectURL(audioBlob) : null
  }
}
