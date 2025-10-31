"use client"

export default function FloralDecor() {
  return (
    <>
      {/* Top left corner flowers */}
      <div className="fixed top-20 left-8 text-4xl opacity-20 pointer-events-none animate-float z-0">🌹</div>
      <div className="fixed top-40 left-24 text-3xl opacity-15 pointer-events-none animate-float-slow z-0">🌸</div>

      {/* Top right corner flowers */}
      <div className="fixed top-32 right-12 text-5xl opacity-20 pointer-events-none animate-float-slow z-0">🌷</div>
      <div className="fixed top-60 right-32 text-3xl opacity-15 pointer-events-none animate-float z-0">🌹</div>

      {/* Bottom left flowers */}
      <div className="fixed bottom-32 left-16 text-4xl opacity-20 pointer-events-none animate-float z-0">🌸</div>

      {/* Bottom right flowers */}
      <div className="fixed bottom-40 right-20 text-5xl opacity-20 pointer-events-none animate-float-slow z-0">🌷</div>

      {/* Center right accent */}
      <div className="fixed top-1/2 right-8 text-3xl opacity-10 pointer-events-none animate-pulse-subtle z-0">💐</div>
    </>
  )
}
