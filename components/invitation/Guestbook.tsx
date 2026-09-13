"use client"

import { useState, type FormEvent } from "react"
import useSWR from "swr"
import { Send, Lock, Unlock } from "lucide-react"
import { getSupabase } from "../../lib/supabase/client"
import { SectionTitle } from "./Card"

const GUESTBOOK_PASSWORD = "mosab2026"

const seedGuests = [
  { name: "نورة السالم", note: "ربنا يتمم لكما على خير ويسعد قلوبكما." },
  { name: "مريم الشعري", note: "أجمل التهاني بمناسبة الزفاف، دام لكما الود والوئام." },
  { name: "عمر الغنيمي", note: "كل عام وأنتما بخير وسعادة، مبارك عليكما." },
]

export function Guestbook() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const { data: remoteGuests, mutate } = useSWR("wedding_guestbook", async () => {
    const client = getSupabase()
    if (!client) return []
    const { data, error } = await client
      .from("wedding_guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(20)
    if (error) throw error
    return data ?? []
  })

  const entries =
    remoteGuests?.map((g) => ({ name: g.name, note: g.message, date: new Date(g.created_at).toLocaleDateString("ar-EG") })) ??
    seedGuests.map((g) => ({ ...g, date: "" }))

  const submit = async () => {
    const cleanName = name.trim()
    const cleanMessage = message.trim()
    if (!cleanName || !cleanMessage) return
    setSending(true)
    const client = getSupabase()
    if (client) {
      const { error } = await client.from("wedding_guestbook").insert({ name: cleanName, message: cleanMessage })
      if (!error) {
        setSent(true)
        setName("")
        setMessage("")
        await mutate()
      }
    }
    setSending(false)
  }

  const checkPassword = (e: FormEvent) => {
    e.preventDefault()
    if (password === GUESTBOOK_PASSWORD) {
      setUnlocked(true)
      setShowPasswordForm(false)
      setPasswordError(false)
      setPassword("")
    } else {
      setPasswordError(true)
    }
  }

  return (
    <section className="guestbook">
      <SectionTitle>سجل التهاني</SectionTitle>
      <form className="guest-form" onSubmit={(e) => { e.preventDefault(); submit() }}>
        <input aria-label="اسمك" placeholder="أدخل اسمك *" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} required />
        <textarea aria-label="تهنئتك" placeholder="اكتب تهنئتك *" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} required />
        <button type="submit" className="btn-burgundy" disabled={sending}>
          <Send size={15} /> {sending ? "جارٍ الإرسال..." : "إرسال التهنئة"}
        </button>
        {sent && <p className="success">تم إرسال تهنئتك بكل محبة.</p>}
      </form>
      {unlocked ? (
        <div className="guest-list">
          {entries.map((guest) => (
            <article key={`${guest.name}-${guest.note}`}>
              <b>{guest.name}</b>
              <small>{guest.date || "تهنئة من القلب"}</small>
              <p>{guest.note}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="guest-lock">
          {!showPasswordForm ? (
            <button
              type="button"
              className="btn-burgundy"
              onClick={() => setShowPasswordForm(true)}
            >
              <Lock size={15} /> عرض التهاني
            </button>
          ) : (
            <form
              className="guest-unlock-form"
              onSubmit={checkPassword}
            >
              <input
                type="password"
                aria-label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false) }}
                autoFocus
              />
              <button type="submit" className="btn-burgundy">
                <Unlock size={15} /> فتح
              </button>
              {passwordError && <p className="error">كلمة المرور غير صحيحة</p>}
            </form>
          )}
        </div>
      )}
    </section>
  )
}
