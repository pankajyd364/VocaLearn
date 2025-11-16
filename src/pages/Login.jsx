import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // mock login
    localStorage.setItem('token', 'demo-token')
    navigate('/lessons')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Sign in</button>
      </form>
      <div className="mt-3 text-sm text-gray-600">No account? <Link to="/signup" className="text-indigo-600">Create one</Link></div>
    </div>
  )
}
