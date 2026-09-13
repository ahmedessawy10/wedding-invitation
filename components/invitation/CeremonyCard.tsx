import { couple, events, families, messages } from "../../lib/wedding"
import { BigDate, Card, CardTitle } from "./Card"

// البطاقة الأولى: الأسرتان + إعلان الزفاف + أسماء العروسين + حفل الحنّة
export function CeremonyCard() {
  const e = events.henna
  return (
    <Card flower={{ side: "left", bottom: "30%", width: "40%", duration: "5.5s", delay: ".6s" }}>
      <CardTitle>معلومات الزفاف</CardTitle>

      <div className="families">
        <div>
          <span className="families-label">{families.groom.label}</span>
          {families.groom.members.map((m) => <b key={m}>{m}</b>)}
        </div>
        <i />
        <div>
          <span className="families-label">{families.bride.label}</span>
          {families.bride.members.map((m) => <b key={m}>{m}</b>)}
        </div>
      </div>

      <p className="announce">{messages.announce}</p>

      <div className="couple">
        <h3>{couple.groom.title} / {couple.groom.name}</h3>
        <span className="couple-label">{messages.groomLabel}</span>
        <span className="couple-amp" aria-hidden="true">&amp;</span>
        <h3>{couple.bride.title} / {couple.bride.name}</h3>
        <span className="couple-degree">{couple.bride.degree}</span>
        <span className="couple-label">{messages.brideLabel}</span>
      </div>

      <div className="event-block">
        <p className="event-venue">{e.title}</p>
        <div className="event-time"><span>{e.day}</span><span>{e.timeLabel}</span></div>
        <BigDate day={e.dayNumber} month={e.monthName} year={e.year} />
      </div>
    </Card>
  )
}
