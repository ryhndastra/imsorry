"use client"

import { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 300
      setIsVisible(isScrolled)

      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollTop = window.scrollY
      setScrollProgress((scrollTop / windowHeight) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40 animate-fade-in hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${(scrollProgress / 100) * 163.36} 163.36`}
              className="transition-all duration-300"
            />
          </svg>
          <svg className="w-6 h-6 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}
