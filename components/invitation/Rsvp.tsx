"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { getSupabase } from "../../lib/supabase/client"

// نافذة تأكيد الحضور — تُحفظ في جدول wedding_rsvp على Supabase
export function Rsvp() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [guests, setGuests] = useState(1)
  const [attending, setAttending] = useState(true)
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setState("sending")
    const client = getSupabase()
    const { error } = client
      ? await client.from("wedding_rsvp").insert({ name: name.trim(), guests, attending })
      : { error: new Error("no client") }
    setState(error ? "error" : "done")
  }

  return (
    <div className="rsvp">
      <button type="button" className="btn-cream" onClick={() => setOpen(true)}>تأكيد الحضور</button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <button type="button" aria-label="إغلاق" onClick={() => setOpen(false)}><X size={20} /></button>
              <h2>تأكيد الحضور</h2>
            </div>
            <div className="modal-content">
              {state === "done" ? (
                <p className="rsvp-done">شكرًا لك، تم تسجيل ردّك بكل محبة</p>
              ) : (
                <form onSubmit={submit} className="rsvp-form">
                  <input placeholder="الاسم *" value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} />
                  <div className="rsvp-row">
                    <label className={attending ? "is-on" : ""}>
                      <input type="radio" checked={attending} onChange={() => setAttending(true)} /> سأحضر بإذن الله
                    </label>
                    <label className={!attending ? "is-on" : ""}>
                      <input type="radio" checked={!attending} onChange={() => setAttending(false)} /> أعتذر عن الحضور
                    </label>
                  </div>
                  {attending && (
                    <label className="rsvp-guests">
                      عدد الحضور
                      <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                  )}
                  <button type="submit" className="btn-burgundy" disabled={state === "sending"}>
                    {state === "sending" ? "جارٍ الإرسال..." : "إرسال"}
                  </button>
                  {state === "error" && <p className="form-error">تعذّر الإرسال الآن، حاول مرة أخرى.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
