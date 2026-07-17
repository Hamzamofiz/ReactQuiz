import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const cssAnimations = `
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(168,85,247,0.5); }
    50%       { box-shadow: 0 4px 35px rgba(168,85,247,0.9); }
  }
  .rule-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    padding: 20px;
    backdrop-filter: blur(10px);
    opacity: 0;
    animation: fadeUp 0.5s ease forwards;
  }
  .start-btn {
    padding: 14px 48px;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 1px;
    background: linear-gradient(90deg, #7c3aed, #a855f7);
    color: #fff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    animation: pulse 2s ease-in-out infinite;
    transition: transform 0.2s;
  }
  .start-btn:hover { transform: scale(1.07); }
`

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    color: '#fff',
    fontSize: '2.2rem',
    fontWeight: 800,
    letterSpacing: '2px',
    textAlign: 'center',
    marginBottom: '30px',
    textShadow: '0 0 20px rgba(130,80,255,0.7)',
    animation: 'fadeDown 0.7s ease forwards',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '36px',
  },
  cardTitle: {
    color: '#c084fc',
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: '8px',
  },
  cardDesc: {
    color: '#cbd5e1',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    margin: 0,
  },
}

const Hero = () => {
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate('/login');
  };

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = cssAnimations
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const rule = [
    {
      id: 1,
      title: "Login Required",
      description: "Quiz start karne ke liye aapka account hona aur login hona zaroori hai.",
    },
    {
      id: 2,
      title: "No Time Limit",
      description: "Is quiz mein koi jaldi nahi hai. Har question ko aaram se padhein aur sahi answer select karein.",
    },
    {
      id: 4,
      title: "Single Selection",
      description: "Har question ke diye gaye options mein se aap sirf ek hi option select kar sakte hain.",
    },
    {
      id: 5,
      title: "Passing Criteria",
      description: "Quiz pass karne ke liye aapko kam se kam 50% marks score karne honge.",
    },
    {
      id: 6,
      title: "Instant Result",
      description: "Submit karte hi aapko ek detailed scorecard milega jismein aapka poora result show hoga.",
    }
  ]

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>🎯 WELCOME TO THE ULTIMATE QUIZ GAME</h1>
      <div style={styles.grid}>
        {rule.map((item, index) => (
          <div
            key={item.id}
            className="rule-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
      <button className="start-btn" onClick={handlenavigate}>START NOW 🚀</button>
    </div>
  )
}

export default Hero
