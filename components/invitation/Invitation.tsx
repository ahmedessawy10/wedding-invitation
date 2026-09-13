"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"
import { Header } from "./Header"
import { CeremonyCard } from "./CeremonyCard"
import { Gallery } from "./Gallery"
import { ReceptionCard, Venues } from "./Venue"
import {  Schedule } from "./DressSchedule"
import { Guestbook } from "./Guestbook"
import { GiftBox } from "./GiftBox"
import { couple, whatsapp } from "../../lib/wedding"

export function Invitation() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <main className="invitation-page">
      <div className="invite-shell animate-reveal">
        <audio ref={audioRef} loop style={{ display: "none" }}>
          <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
        </audio>
        <button
          aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
          className={`floating-music-btn ${playing ? "playing" : ""}`}
          onClick={toggleMusic}
        >
          <span className="equalizer-bars">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
            <span className="bar bar-4" />
          </span>
        </button>

        <a
          href={`https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          className="floating-whatsapp-btn"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
            <path d="M12 2C6.5 2 2 6.4 2 12c0 1.9.5 3.6 1.5 5.2L2 22l4.9-1.3c1.5.8 3.2 1.3 5.1 1.3 5.5 0 10-4.4 10-10S17.5 2 12 2zm0 18.3c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5.9.9-3.4-.2-.3C3.5 14.6 3 13.3 3 12c0-5 4-9 9-9s9 4 9 9-4 9.3-9 9.3z" />
          </svg>
        </a>

        <Header />
        <CeremonyCard />
        {/* <Gallery /> */}
        <Schedule />
        <ReceptionCard />
        
        <Venues />
        {/* <DressCode /> */}
       
        <Guestbook />
        {/* <GiftBox /> */}

        <footer className="footer">
          صُنع بحب من أجل يوم {couple.groom.short} و{couple.bride.short} <Heart size={13} fill="currentColor" />
        </footer>
      </div>
    </main>
  )
}
