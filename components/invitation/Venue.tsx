import { CalendarDays } from "lucide-react"
import { events, googleCalendarUrl } from "../../lib/wedding"
import { BigDate, Card, CardTitle, Castle } from "./Card"
import { Countdown } from "./Countdown"
import { Calendar } from "./Calendar"
import { Rsvp } from "./Rsvp"

// بطاقة حفل الإشهار: التاريخ + العدّ التنازلي + تقويم الشهر + زر التأكيد
export function ReceptionCard() {
  const e = events.ishhar
  return (
    <Card flower={{ side: "left", top: "10%", width: "32%", duration: "6s", delay: ".3s" }}>
      <CardTitle>معلومات حفل الإشهار</CardTitle>
      <div className="reception-body">
        <h3>سيُقام حفل الإشهار في:</h3>
        <div className="event-time"><span>{e.day}</span><span>{e.timeLabel}</span></div>
        <BigDate day={e.dayNumber} month={e.monthName} year={e.year} size="md" />
        <Countdown />
        <Calendar />
        <a className="add-calendar" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
          <CalendarDays size={16} /> إضافة إلى التقويم
        </a>
        <Rsvp />
      </div>
    </Card>
  )
}

function MapCard({ e }: { e: (typeof events)["henna"] }) {
  return (
    <section className="venue-section">
      <h3>{e.venue}</h3>
      <p>{e.address}</p>
      <div className="map-card">
        <iframe
          title={e.venue}
          src={`https://maps.google.com/maps?q=${e.lat},${e.lng}&z=17&hl=ar&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a className="directions" href={e.mapsLink} target="_blank" rel="noreferrer">فتح الموقع على خرائط جوجل</a>
    </section>
  )
}

export function Venues() {
  return (
    <div className="venues">
      <Castle top="-1%" width="158%" />
      <MapCard e={events.henna} />
      <MapCard e={events.ishhar} />
    </div>
  )
}
