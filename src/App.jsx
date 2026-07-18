import React, { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Singup from './pages/Singup.jsx'
import Hero from './pages/Hero.jsx'
import Quiz from './pages/Quiz.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './Firebase/Auth.js'
import { onAuthStateChanged } from 'firebase/auth'

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />
}

const App = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null))
    return () => unsub()
  }, [])

  if (user === undefined) return null

  return (
    <div>
      <Routes>
        <Route path="/"       element={<Hero />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/quiz"   element={<ProtectedRoute user={user}><Quiz /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
