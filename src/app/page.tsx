"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import PhotoGallery from "@/components/photo-gallery"
import LoveMessages from "@/components/love-messages"
import InteractiveGames from "@/components/interactive-games"
import FloralDecor from "@/components/floral-decor"
import ScrollToTop from "@/components/scroll-to-top"
import Confetti from "@/components/confetti"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollTop = window.scrollY
      setScrollProgress((scrollTop / windowHeight) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative overflow-x-hidden bg-white">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 z-50"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      <Confetti />
      <FloralDecor />
      <HeroSection />
      <PhotoGallery />
      <LoveMessages />
      <InteractiveGames />
      <ScrollToTop />
    </main>
  )
}
