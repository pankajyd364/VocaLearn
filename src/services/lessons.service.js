export async function fetchLessons() {
  // mock delay
  await new Promise(r => setTimeout(r, 200))
  return [
    { id: '1', title: 'Greetings', difficulty: 'Easy', sentence: 'Hello, how are you?' },
    { id: '2', title: 'Introductions', difficulty: 'Easy', sentence: 'My name is John.' },
    { id: '3', title: 'Ordering Food', difficulty: 'Medium', sentence: 'I would like a pizza, please.' }
  ]
}

export async function fetchLessonById(id) {
  const all = await fetchLessons()
  return all.find(l => l.id === id) || null
}
