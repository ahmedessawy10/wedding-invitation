"use client"

import { useState } from "react"
import { Gift, X } from "lucide-react"
import { gifts, messages } from "../../lib/wedding"
import { Castle, SectionTitle } from "./Card"

export function GiftBox() {
  const [open, setOpen] = useState(false)
  const configured = gifts.filter((g) => g.value.trim().length > 0)

  return (
    <div className="gift-wrap">
      <Castle top="6%" width="155%" />
      <div className="gift">
        <SectionTitle>صندوق الهدية</SectionTitle>
        <button type="button" className="gift-box-btn" onClick={() => setOpen(true)} aria-label="فتح صندوق الهدية">
          <img src="/giftbox/box.webp" alt="" />
          <span>اضغط للفتح</span>
        </button>
        <p>{messages.thanks}</p>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <button type="button" aria-label="إغلاق" onClick={() => setOpen(false)}><X size={20} /></button>
              <h2>صندوق الهدية</h2>
            </div>
            <div className="modal-content">
              {configured.length === 0 ? (
                <p className="rsvp-done"><Gift size={20} /> {messages.footer}</p>
              ) : (
                <div className="gift-methods">
                  {configured.map((g) => (
                    <div key={g.label} className="gift-method">
                      <h3>{g.label}</h3>
                      <p className="gift-value">{g.value}</p>
                      <p className="gift-note">{g.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
