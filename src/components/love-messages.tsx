"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Sparkles } from "lucide-react"

interface Message {
  id: number
  title: string
  emoji: string
  content: string
  color: string
}

const loveMessages: Message[] = [
  {
  id: 1,
  title: "Kenapa Aku Sayang Kamu",
  emoji: "💖",
  content:
    "Kamu bikin hari hariku lebih berwarna. Senyum kamu tuh kaya vitamin buat aku, bikin aku pengen selalu ada di samping kamu. Maafin aku kalo kadang aku kurang peka ya ❤️",
  color: "from-rose-100 to-pink-100",
  },
  {
  id: 2,
  title: "Penyesalan Aku",
  emoji: "😔",
  content:
    "Aku bener bener minta maaf karena udah ngebohong sama kamu sebelumnya. Aku ngga mau kamu nangis lagi atau ngerasa kurang karena aku sendiri yang salah. Aku nyesel banget udah bikin kamu mikir kaya gitu. Aku janji bakal lebih jujur dan berusaha ngga bakal nyakitin kamu lagi 💖",
  color: "from-red-100 to-rose-100",
},
{
  id: 3,
  title: "Janji Aku Buat Kamu",
  emoji: "🤝",
  content:
    "Aku janji bakal buang diri aku yang dulu yang egois, yang suka nyakitin tanpa sadar, dan yang pernah bikin kamu nangis. Aku gamau nyakitin orang orang di sekitarku lagi, apalagi kamu, orang yang paling aku sayang. Aku mau berubah, bener bener berubah, biar hal kaya kemarin ga kejadian lagi. Tapi aku juga pengen kamu tetep di samping aku, temenin aku buat jadi versi terbaik dari diriku. Tolong jangan tinggalin aku ya sayangku, aku butuh kamu buat jalan bareng di proses ini, kalau kamu gaada tenaga dan cape, kamu boleh istirahat dulu dari hal hal yg bikin kamu cape kok, tapi bukan berarti harus sendirian dan tinggalin aku ya sayang 💖",
  color: "from-pink-100 to-fuchsia-100",
},
 {
  id: 4,
  title: "Selamanya Bareng Kamu",
  emoji: "✨",
  content:
    "Makasih banget udah sabar sama aku. Makasih juga udah sayang sama aku dan ngasih kesempatan lagi. Aku minta maaf ya kalo kamu masih ngerasa rugi sama aku, aku sadar kadang aku kurang ngasih feedback dan perhatian ke kamu. Aku janji bakal lebih berjuang, lebih usaha nyata, bukan cuma kata kata doang, buat bikin hubungan kita lebih baik. Aku gasabar buat ngejalanin sisa hidupku buat benerin semua kesalahan aku, dan bikin momen momen indah bareng kamu. Aku pengen selamanya bareng kamu, aku sayang banget sama kamu dear tekonong konong kowernya aku 💖",
  color: "from-purple-100 to-pink-100",
}

]

export default function LoveMessages() {
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [clickedCards, setClickedCards] = useState<Set<number>>(new Set())

  const handleMessageClick = (id: number, e: React.MouseEvent) => {
    setExpandedId(expandedId === id ? null : id)

    setClickedCards((prev) => new Set(prev).add(id))

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

    // Generate multiple hearts for better effect
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
      y: rect.top + rect.height / 2,
    }))

    setHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)))
    }, 1200)
  }

  return (
    <section id="messages" className="py-20 px-4 relative z-10 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 animate-slide-in-left">
            Love Letters for You
          </h2>
          <p className="text-foreground/60 text-lg flex items-center justify-center gap-2 animate-fade-in">
            <Sparkles className="w-5 h-5" />
            Click on each message to read my heart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loveMessages.map((message, index) => (
            <div
              key={message.id}
              onClick={(e) => handleMessageClick(message.id, e)}
              className="cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`bg-gradient-to-br ${message.color} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-rose-200/50 hover:border-rose-400 min-h-40 ${
                  clickedCards.has(message.id) ? "ring-2 ring-rose-400" : ""
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    {message.emoji}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-rose-600 pt-2">{message.title}</h3>
                </div>

                {expandedId === message.id && (
                  <p className="text-foreground/80 leading-relaxed text-base md:text-lg animate-fade-in">
                    {message.content}
                  </p>
                )}

                {expandedId !== message.id && (
                  <p className="text-foreground/60 text-sm italic">Click to read more...</p>
                )}

                <div className="flex justify-end mt-4">
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${expandedId === message.id ? "text-rose-500 fill-rose-500 scale-125" : "text-rose-400 fill-rose-400"}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none animate-float-up text-2xl"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          }}
        >
          ❤️
        </div>
      ))}
    </section>
  )
}
