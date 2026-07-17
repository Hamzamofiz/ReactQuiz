import React, { useEffect, useState } from 'react'
import loginpng from '../assets/login.png'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../Firebase/Auth.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const cssAnimations = `
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(168,85,247,0.5); }
    50%       { box-shadow: 0 4px 35px rgba(168,85,247,0.9); }
  }
  .signup-img-side  { animation: fadeLeft 0.7s ease forwards; }
  .signup-form-side { animation: fadeRight 0.7s ease forwards; }
  .signup-input {
    width: 100%; padding: 12px 16px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px; color: #fff;
    font-size: 0.95rem; outline: none;
    transition: border 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
  }
  .signup-input::placeholder { color: #94a3b8; }
  .signup-input:focus {
    border-color: #a855f7;
    box-shadow: 0 0 10px rgba(168,85,247,0.4);
  }
  .signup-btn {
    width: 100%; padding: 12px;
    font-size: 1rem; font-weight: 700; letter-spacing: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7);
    color: #fff; border: none; border-radius: 50px; cursor: pointer;
    animation: pulse 2s ease-in-out infinite;
    transition: transform 0.2s; margin-top: 8px;
  }
  .signup-btn:hover { transform: scale(1.04); }
  .signup-btn:disabled { opacity: 0.6; cursor: not-allowed; animation: none; }
  @media (max-width: 768px) {
    .signup-img-side  { display: none; }
    .signup-form-side { width: 100%; padding: 24px 16px; }
  }
`

const styles = {
  wrapper: {
    display: 'flex', minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden',
  },
  imgSide: {
    flex: 1, backgroundImage: `url(${loginpng})`,
    backgroundSize: 'cover', backgroundPosition: 'center',
  },
  formSide: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '40px', minWidth: 0,
  },
  formBox: {
    width: '100%', maxWidth: '380px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '20px', padding: '40px 32px',
    backdropFilter: 'blur(12px)',
    display: 'flex', flexDirection: 'column', gap: '16px',
  },
  heading: {
    color: '#fff', fontSize: '2rem', fontWeight: 800,
    textAlign: 'center', margin: 0,
    textShadow: '0 0 20px rgba(130,80,255,0.7)', letterSpacing: '2px',
  },
  subtext: { color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: 0 },
  error: {
    color: '#f87171', fontSize: '0.85rem',
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.3)',
    borderRadius: '8px', padding: '10px 14px', margin: 0,
  },
  success: {
    color: '#4ade80', fontSize: '0.85rem',
    background: 'rgba(74,222,128,0.1)',
    border: '1px solid rgba(74,222,128,0.3)',
    borderRadius: '8px', padding: '10px 14px', margin: 0,
  },
  linkRow: { textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' },
  link: { color: '#a855f7', fontWeight: 600, textDecoration: 'none', marginLeft: '4px' },
}



const Singup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = cssAnimations
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleSignup = async () => {
    setError('')
    setSuccess('')
    if (!username || !email || !password) return setError('Sare fields bharna zaroori hain.')
    if (password.length < 6) return setError('Password kam se kam 6 characters ka hona chahiye.')
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: username })
      setSuccess('Account ban gaya! Login page par ja rahe hain...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <div className="signup-img-side" style={styles.imgSide} />
      <div className="signup-form-side" style={styles.formSide}>
        <div style={styles.formBox}>
          <h1 style={styles.heading}>SIGN UP</h1>
          <p style={styles.subtext}>Create your account to get started!</p>
          {error   && <p style={styles.error}>⚠️ {error}</p>}
          {success && <p style={styles.success}>✅ {success}</p>}
          <input className="signup-input" type="text"     placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input className="signup-input" type="email"    placeholder="Email"    value={email}    onChange={e => setEmail(e.target.value)} />
          <input className="signup-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="signup-btn" onClick={handleSignup} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up 🚀'}
          </button>
          <p style={styles.linkRow}>
            Pehle se account hai?
            <Link to="/login" style={styles.link}>Login karein</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Singup
