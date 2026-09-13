"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { gallery } from "../../lib/wedding"
import { SectionTitle, Castle } from "./Card"

// موضع كل صورة على أسطوانة ثلاثية الأبعاد بحسب بعدها عن الصورة النشطة
function slot(offset: number, n: number) {
  let d = offset
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  const a = Math.abs(d)
  const sign = d < 0 ? -1 : 1
  if (a === 0) return { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 }
  const scale = a === 1 ? 0.85 : 0.7
  const opacity = a === 1 ? 0.75 : a === 2 ? 0.5 : a === 3 ? 0.3 : 0
  return { transform: `translateX(${sign * 60 * a}%) translateZ(${-150 * a}px) rotateY(${sign * 45 * a}deg) scale(${scale})`, opacity, zIndex: 100 - a }
}

export function Gallery() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)
  const n = gallery.length
  const prev = () => setActive((a) => (a - 1 + n) % n)
  const next = () => setActive((a) => (a + 1) % n)

  useEffect(() => {
    if (open !== null) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [open, n]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowLeft") setOpen((o) => (o! + 1) % n)
      if (e.key === "ArrowRight") setOpen((o) => (o! - 1 + n) % n)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [open, n])

  return (
    <div className="gallery-wrap">
      <Castle top="-6%" width="150%" />
      <div className="gallery">
        <SectionTitle>ألبوم الصور</SectionTitle>
        <div className="carousel-outer">
          <div
            className="carousel"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 40) (dx > 0 ? prev : next)()
              touchX.current = null
            }}
          >
            <button type="button" aria-label="الصورة السابقة" className="carousel-arrow carousel-arrow-left" onClick={prev}><ChevronLeft size={16} strokeWidth={2.5} /></button>
            <button type="button" aria-label="الصورة التالية" className="carousel-arrow carousel-arrow-right" onClick={next}><ChevronRight size={16} strokeWidth={2.5} /></button>
            <div className="carousel-stage">
              {gallery.map((src, i) => {
                const s = slot(i - active, n)
                return (
                  <div key={src} className={`carousel-item ${i === active ? "is-active" : ""}`} style={s} onClick={() => (i === active ? setOpen(i) : setActive(i))}>
                    <img src={src} alt={`صورة ${i + 1}`} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="carousel-dots">
            {gallery.map((_, i) => <button key={i} type="button" aria-label={`الصورة ${i + 1}`} className={i === active ? "is-active" : ""} onClick={() => setActive(i)} />)}
          </div>
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lightbox-close" aria-label="إغلاق" onClick={() => setOpen(null)}><X /></button>
          <div className="lightbox-counter">{open + 1} / {n}</div>
          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="السابقة" onClick={() => setOpen((open - 1 + n) % n)}>‹</button>
            <img src={gallery[open]} alt={`صورة ${open + 1}`} />
            <button type="button" aria-label="التالية" onClick={() => setOpen((open + 1) % n)}>›</button>
          </div>
          <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
            {gallery.map((src, i) => <button key={src} type="button" className={i === open ? "is-active" : ""} onClick={() => setOpen(i)}><img src={src} alt="" /></button>)}
          </div>
        </div>
      )}
    </div>
  )
}
