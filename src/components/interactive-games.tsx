"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function InteractiveGames() {
  const [daysCount, setDaysCount] = useState(0)
  const [startDate, setStartDate] = useState<string>("2024-09-22")
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysCount(diffDays)
  }, [startDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
  }

  const quizQuestions = [
    {
      question: "What's my favorite thing about you?",
      options: ["Your smile", "Your laugh", "Your heart", "Everything"],
      correct: 3,
    },
    {
      question: "How many times a day do I think about you?",
      options: ["Too many", "All day", "Every second", "Non-stop"],
      correct: 2,
    },
    {
      question: "Will I always love you?",
      options: ["Maybe", "Probably", "Definitely", "Forever and always"],
      correct: 3,
    },
  ]

  const handleQuizAnswer = (index: number) => {
    if (index === quizQuestions[quizIndex].correct) {
      setScore(score + 1)
      triggerConfetti()
    }

    const nextQuestion = quizIndex + 1
    if (nextQuestion < quizQuestions.length) {
      setQuizIndex(nextQuestion)
    } else {
      setShowScore(true)
      triggerConfetti()
    }
  }

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 2000)
  }

  const restartQuiz = () => {
    setQuizIndex(0)
    setScore(0)
    setShowScore(false)
  }

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground mb-4 animate-fade-in">
          Let's Have Fun
        </h2>
        <p className="text-center text-foreground/60 mb-16">Spend some time with me interactively</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Days Counter */}
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 text-center border-2 border-rose-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <h3 className="text-2xl font-serif font-bold text-rose-600 mb-4">Days Together</h3>
            <div className="text-7xl font-bold text-rose-500 mb-4 animate-float">{daysCount}</div>
            <p className="text-foreground/70 text-lg">And I want 1000s more with you</p>

            <div className="mt-6">
              {isEditingDate ? (
                <div className="flex gap-2 items-center justify-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleDateChange}
                    className="px-3 py-2 rounded-lg border-2 border-rose-300 text-foreground focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={() => setIsEditingDate(false)}
                    className="px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingDate(true)}
                  className="text-sm text-rose-500 hover:text-rose-600 underline transition-colors"
                >
                  Started: {new Date(startDate).toLocaleDateString()} | Edit
                </button>
              )}
            </div>

            <div className="mt-6 text-5xl animate-bounce" style={{ animationDuration: "2s" }}>
              💑
            </div>
          </div>

          {/* Quiz Game */}
          <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-3xl p-8 border-2 border-rose-200 relative overflow-hidden hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-serif font-bold text-rose-600 mb-6">Love Quiz</h3>

            {confetti.map((conf) => (
              <div
                key={conf.id}
                className="fixed w-2 h-2 bg-rose-400 rounded-full animate-float-up pointer-events-none"
                style={{
                  left: `${conf.left}%`,
                  top: "50%",
                  animationDelay: `${conf.delay}s`,
                }}
              />
            ))}

            {!showScore ? (
              <div>
                <p className="text-foreground/80 mb-6 font-semibold min-h-16">{quizQuestions[quizIndex].question}</p>
                <div className="space-y-3">
                  {quizQuestions[quizIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full bg-white text-foreground rounded-lg p-3 hover:bg-rose-100 transition-all duration-300 border-2 border-rose-200 hover:border-rose-400 font-medium hover:scale-105 active:scale-95"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-foreground/60 mt-4">
                  Question {quizIndex + 1} of {quizQuestions.length}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-6xl mb-4 animate-bounce">
                  {score === quizQuestions.length ? "🎉" : score >= 2 ? "😊" : "💕"}
                </p>
                <p className="text-2xl font-bold text-rose-600 mb-4">
                  {score}/{quizQuestions.length}
                </p>
                <p className="text-foreground/70 mb-6">
                  {score === quizQuestions.length
                    ? "Perfect score! You know me so well! ❤️"
                    : "You did great! I love you! ❤️"}
                </p>
                <button
                  onClick={restartQuiz}
                  className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Clickable Hearts with counter */}
          <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-3xl p-8 text-center border-2 border-rose-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <h3 className="text-2xl font-serif font-bold text-rose-600 mb-4">Tap the Hearts</h3>
            <button
              onClick={() => {
                setClickCount(clickCount + 1)
                triggerConfetti()
              }}
              className="text-9xl hover:scale-125 transition-transform transform active:scale-95 inline-block"
              aria-label="Click heart"
            >
              ❤️
            </button>
            <p className="text-3xl font-bold text-rose-500 mt-6 animate-pulse">{clickCount}</p>
            <p className="text-foreground/70 mt-2">kisses for you 💋</p>

            {/* Visual feedback particles */}
            {Array.from({ length: Math.min(clickCount % 5, 3) }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-rose-400 rounded-full animate-float-up"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 30}%`,
                  top: "40%",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
