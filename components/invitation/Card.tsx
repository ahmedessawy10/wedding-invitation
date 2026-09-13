import type { CSSProperties, ReactNode } from "react"

type Flower = { side: "left" | "right"; top?: string; bottom?: string; width: string; delay?: string; duration?: string; rotate?: string }

// بطاقة عنابية بملمس ورقي مع زهرة عائمة على الحافة — مثل بطاقات القالب الأصلي
export function Card({ children, flower, className = "" }: { children: ReactNode; flower?: Flower; className?: string }) {
  const style: CSSProperties = flower
    ? { [flower.side]: `-${parseFloat(flower.width) / 2}%`, top: flower.top, bottom: flower.bottom, width: flower.width }
    : {}
  return (
    <section className={`card-section ${className}`}>
      {flower && (
        <span aria-hidden="true" className="card-flower" style={style}>
          <span className="float" style={{ animationDuration: flower.duration, animationDelay: flower.delay }}>
            <img src="/theme/flower2-decoration.webp" alt="" style={{ transform: flower.rotate ? `rotate(${flower.rotate})` : undefined }} />
          </span>
        </span>
      )}
      <div className="card">
        <div className="card-bg" aria-hidden="true" />
        <img src="/theme/paper.webp" alt="" aria-hidden="true" className="card-paper" />
        <div className="card-body">{children}</div>
      </div>
    </section>
  )
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="card-title">{children}</h2>
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

export function Castle({ top, width }: { top: string; width: string }) {
  return <img src="/theme/castle-background.webp" alt="" aria-hidden="true" className="castle" style={{ top, width }} />
}

export function BigDate({ day, month, year, size = "lg" }: { day: number; month: string; year: number; size?: "lg" | "md" }) {
  return (
    <div className={`big-date big-date-${size}`}>
      <span className="big-date-day">{day}</span>
      <i />
      <div>
        <span>{month}</span>
        <span>{year}</span>
      </div>
    </div>
  )
}
