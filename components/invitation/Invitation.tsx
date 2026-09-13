"use client"

import { useState } from "react"
import { Heart, Volume2, VolumeX } from "lucide-react"
import { Header } from "./Header"
import { CeremonyCard } from "./CeremonyCard"
import { Gallery } from "./Gallery"
import { ReceptionCard, Venues } from "./Venue"
import { DressCode, Schedule } from "./DressSchedule"
import { Guestbook } from "./Guestbook"
import { GiftBox } from "./GiftBox"
import { couple } from "../../lib/wedding"

export function Invitation() {
  const [muted, setMuted] = useState(true)

  return (
    <main className="invitation-page">
      <div className="invite-shell animate-reveal">
        {/* ضع ملف الموسيقى في public/audio/wedding-song.mp3 لتفعيل الصوت */}
        <audio loop muted={muted} style={{ display: "none" }}>
          <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
        </audio>
        <button
          aria-label={muted ? "تشغيل الموسيقى" : "إيقاف الموسيقى"}
          className="sound-button"
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <Header />
        <CeremonyCard />
        <Gallery />
        <ReceptionCard />
        <Venues />
        <DressCode />
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
