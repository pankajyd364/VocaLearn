import React, { useState, useRef } from "react";

export default function VocaLearnPrototype({ lessonId }) {
  // Sample lessons
  const sampleLessons = [
    { id: 1, title: "Greeting & Introductions", sentence: "Hello, my name is Alex. Nice to meet you." },
    { id: 2, title: "Asking for Directions", sentence: "Excuse me, could you tell me how to get to the train station?" },
    { id: 3, title: "Ordering Food", sentence: "I'd like a cup of coffee and a croissant, please." },
  ];

  const [currentLesson, setCurrentLesson] = useState(
    sampleLessons.find((l) => l.id === lessonId) || sampleLessons[0]
  );

  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ---- Recording Logic ----
  const startRecording = async () => {
    setFeedback(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // ---- TTS Playback ----
  const playPrompt = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // ---- Mock Analysis ----
  const analyzeRecording = async () => {
    if (!recordedUrl) {
      alert("Please record your voice first.");
      return;
    }

    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate network delay

    const pronunciationScore = Math.floor(70 + Math.random() * 30);
    const grammarScore = Math.floor(75 + Math.random() * 25);
    const errors = Math.random() > 0.5
      ? [{ type: "pronunciation", suggestion: "Try to emphasize 'excuse' more clearly." }]
      : [];

    setFeedback({ pronunciationScore, grammarScore, errors });
    setIsAnalyzing(false);
  };

  const clearRecording = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Lesson selection */}
      <div>
        <label className="block font-semibold mb-1">Choose Lesson:</label>
        <select
          value={currentLesson.id}
          onChange={(e) => {
            const newLesson = sampleLessons.find((l) => l.id === Number(e.target.value));
            setCurrentLesson(newLesson);
            clearRecording();
          }}
          className="border rounded p-2"
        >
          {sampleLessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>

      {/* Lesson display */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
        <p className="text-gray-700 mb-4">{currentLesson.sentence}</p>
        <button
          onClick={() => playPrompt(currentLesson.sentence)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          🔊 Listen
        </button>
      </div>

      {/* Recorder controls */}
      <div className="bg-white p-4 shadow rounded-xl">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ⏹ Stop Recording
          </button>
        )}

        {recordedUrl && (
          <div className="mt-4 space-x-3">
            <audio controls src={recordedUrl} className="inline-block" />
            <button
              onClick={clearRecording}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Analyze */}
      <div>
        <button
          onClick={analyzeRecording}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Recording"}
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Feedback</h3>
          <p>🎯 Pronunciation Score: <strong>{feedback.pronunciationScore}</strong></p>
          <p>📝 Grammar Score: <strong>{feedback.grammarScore}</strong></p>
          {feedback.errors.length > 0 ? (
            <ul className="list-disc ml-6 mt-2 text-sm text-red-600">
              {feedback.errors.map((err, i) => (
                <li key={i}>{err.suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 mt-2 text-sm">No major issues detected!</p>
          )}
        </div>
      )}
    </div>
  );
}
