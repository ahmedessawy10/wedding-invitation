"use client"

import { useEffect, useState } from "react"
import { mainDateISO } from "../../lib/wedding"

function parts(target: number) {
  const diff = Math.max(0, target - Date.now())
  const s = Math.floor(diff / 1000)
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, done: diff === 0 }
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null)
  useEffect(() => {
    const target = new Date(mainDateISO).getTime()
    const tick = () => setT(parts(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="countdown">
      <h4>العدّ التنازلي</h4>
      {!t ? (
        <p>جارٍ الحساب...</p>
      ) : t.done ? (
        <p>حان موعد الفرح</p>
      ) : (
        <div className="countdown-grid">
          <div><b>{t.days}</b><span>يوم</span></div>
          <div><b>{t.hours}</b><span>ساعة</span></div>
          <div><b>{t.minutes}</b><span>دقيقة</span></div>
          <div><b>{t.seconds}</b><span>ثانية</span></div>
        </div>
      )}
    </div>
  )
}
