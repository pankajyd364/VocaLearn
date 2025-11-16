import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LessonsList from './pages/Lessons/LessonsList'
import LessonDetail from './pages/Lessons/LessonDetail'
import PracticeSession from './pages/Practice/PracticeSession'
import ResultView from './pages/Results/ResultView'
import History from './pages/History'
import Profile from './pages/Profile'
import Help from './pages/Help'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lessons" element={<LessonsList />} />
        <Route path="/lessons/:lessonId" element={<LessonDetail />} />
        <Route path="/practice/:lessonId" element={<PracticeSession />} />
        <Route path="/results/:sessionId" element={<ResultView />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  )
}
