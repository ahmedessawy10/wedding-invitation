import { calendarMonth } from "../../lib/wedding"

const DAYS = ["س", "ح", "ن", "ث", "ر", "خ", "ج"] // يبدأ الأسبوع بالسبت

export function Calendar() {
  const { year, month, label, highlight, main } = calendarMonth
  const first = new Date(year, month, 1)
  const lead = (first.getDay() + 1) % 7 // أحد=0 → السبت=0
  const count = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)]

  return (
    <div className="calendar-wrap">
      <div className="calendar">
        <div className="calendar-month">{label}</div>
        <div className="calendar-days">{DAYS.map((d) => <div key={d}>{d}</div>)}</div>
        <div className="calendar-grid">
          {cells.map((d, i) => (
            <div key={i}>
              {d && highlight.includes(d) ? (
                <div className={`calendar-heart ${d === main ? "is-main" : ""}`}>
                  <svg viewBox="0 0 24 22"><path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" /></svg>
                  <span>{d}</span>
                </div>
              ) : d ? (
                <span>{d}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
