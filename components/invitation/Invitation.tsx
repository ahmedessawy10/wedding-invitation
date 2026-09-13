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
import { couple } from "../../lib/wedding"

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

        <Header />
        <CeremonyCard />
        {/* <Gallery /> */}
        <ReceptionCard />
        <Venues />
        {/* <DressCode /> */}
        <Schedule />
        <Guestbook />
        {/* <GiftBox /> */}

        <footer className="footer">
          صُنع بحب من أجل يوم {couple.groom.short} و{couple.bride.short} <Heart size={13} fill="currentColor" />
        </footer>
      </div>
    </main>
  )
}
