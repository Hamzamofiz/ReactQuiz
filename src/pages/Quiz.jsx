import React, { useEffect, useState } from 'react'

const cssAnimations = `
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(168,85,247,0.5); }
    50%       { box-shadow: 0 4px 35px rgba(168,85,247,0.9); }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: var(--progress); }
  }
  .quiz-card {
    animation: fadeDown 0.5s ease forwards;
  }
  .option-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: #cbd5e1;
    cursor: pointer;
    transition: border 0.2s, background 0.2s, transform 0.2s;
    font-size: 0.95rem;
    animation: fadeUp 0.4s ease forwards;
    opacity: 0;
  }
  .option-label:hover {
    border-color: #a855f7;
    background: rgba(168,85,247,0.15);
    transform: translateX(4px);
  }
  .option-label.selected {
    border-color: #a855f7;
    background: rgba(168,85,247,0.25);
    color: #fff;
  }
  .option-label input[type="radio"] { display: none; }
  .radio-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #a855f7;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .radio-dot.filled::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a855f7;
  }
  .quiz-btn {
    width: 100%;
    padding: 13px;
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
    margin-top: 8px;
  }
  .quiz-btn:hover { transform: scale(1.03); }
  .quiz-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    animation: none;
    transform: none;
  }
`

const quizQuestions = [
  { id: 1, question: "React mein state ko update karne ke liye kaunsa hook use hota hai?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: "useState" },
  { id: 2, question: "JavaScript mein 'const' se declare kiye gaye variable ko re-assign kiya ja sakta hai?", options: ["Haan", "Nahi", "Sirf functions ke andar", "Sirf loops ke andar"], correctAnswer: "Nahi" },
  { id: 3, question: "React component ka UI render hone ke baad side-effects run karne ke liye kaunsa hook use hota hai?", options: ["useMemo", "useRef", "useEffect", "useState"], correctAnswer: "useEffect" },
  { id: 4, question: "React mein child component ko data pass karne ke liye kya use kiya jata hai?", options: ["State", "Props", "Context", "Redux"], correctAnswer: "Props" },
  { id: 5, question: "HTML elements ko unique identity dene ke liye React lists mein kya dena zaroori hota hai?", options: ["id", "class", "key", "index"], correctAnswer: "key" },
  { id: 6, question: "JavaScript ka typeof operator null ke liye kya return karta hai?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correctAnswer: "'object'" },
  { id: 7, question: "React mein Virtual DOM ka main purpose kya hota hai?", options: ["Application ko secure banana", "Direct actual DOM ko change karna", "Performance ko fast aur optimize karna", "Database se connect karna"], correctAnswer: "Performance ko fast aur optimize karna" },
  { id: 8, question: "JavaScript mein single-line comment ke liye kaunsa symbol use hota hai?", options: ["/*", "//", "<!--", "#"], correctAnswer: "//" },
  { id: 9, question: "Kya React components hamesha ek single parent element return karte hain?", options: ["Haan, hamesha", "Nahi, zaroori nahi", "Sirf class components mein", "Sirf functional components mein"], correctAnswer: "Haan, hamesha" },
  { id: 10, question: "JSX ka full form kya hai?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Xerox", "JSON XML Extension"], correctAnswer: "JavaScript XML" },
]

const Quiz = () => {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = cssAnimations
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const progress = ((current + 1) / quizQuestions.length) * 100
  const q = quizQuestions[current]

  const handleNext = () => {
    if (selected === q.correctAnswer) setScore(s => s + 1)
    if (current + 1 === quizQuestions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {finished ? (
        <div className="quiz-card" style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '20px',
          padding: '48px 40px',
          backdropFilter: 'blur(12px)',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
            {score >= 5 ? '🏆' : '😢'}
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px', textShadow: '0 0 20px rgba(130,80,255,0.7)' }}>
            Quiz Complete!
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            Aapka score hai
          </p>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#c084fc', marginBottom: '8px' }}>
            {score} / {quizQuestions.length}
          </div>
          <p style={{ color: score >= 5 ? '#4ade80' : '#f87171', fontWeight: 600, marginBottom: '28px' }}>
            {score >= 5 ? '🎉 Passed!' : '❌ Failed! Try again'}
          </p>
          <button className="quiz-btn" onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false) }}>
            Retry Quiz 🔄
          </button>
        </div>
      ) : (
        <div className="quiz-card" key={current} style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '20px',
          padding: '36px 32px',
          backdropFilter: 'blur(12px)',
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Question {current + 1} of {quizQuestions.length}</span>
            <span style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.9rem' }}>Score: {score}</span>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
              borderRadius: '99px',
              transition: 'width 0.4s ease',
            }} />
          </div>

          {/* Question */}
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, margin: 0, lineHeight: '1.6' }}>
            {q.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((option, i) => (
              <label
                key={option}
                className={`option-label${selected === option ? ' selected' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setSelected(option)}
              >
                <input type="radio" name={`q-${current}`} value={option} readOnly checked={selected === option} />
                <span className={`radio-dot${selected === option ? ' filled' : ''}`} />
                {option}
              </label>
            ))}
          </div>

          {/* Button */}
          <button className="quiz-btn" disabled={!selected} onClick={handleNext}>
            {current + 1 === quizQuestions.length ? 'Submit 🎯' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
