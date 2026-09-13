import Link from "next/link"
import { couple, mainDateLabel, messages } from "../lib/wedding"

const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"

// قيم ثابتة حتى يتطابق تصيير الخادم مع المتصفح
const hearts = [
  [81, "#c9a24a", 16, 5, 23, -3.5], [65, "#ece4d8", 23, -3, 20.7, -15.9], [14.6, "#c9a24a", 23, 1.5, 25, -12.4],
  [31, "#c9a24a", 18, 10.4, 21.8, -10.9], [31.4, "#ece4d8", 11, -4.2, 23, -7.6], [78, "#ece4d8", 18.5, -14.9, 19.5, -0.8],
  [33.7, "#7a1f26", 16, -14.3, 25, -12.7], [51, "#ece4d8", 12.8, 5.3, 22.8, -11.2], [65.3, "#a8323b", 15, 1.6, 18.8, -5.7],
  [14.6, "#7a1f26", 17, -5.4, 24, -21.5], [34.9, "#c9a24a", 14.5, -29.5, 18.9, -8.5], [15.5, "#a8323b", 11, 7.7, 23.6, -1.6],
] as const

export default function EnvelopePage() {
  return (
    <div className="envelope-screen">
      <div className="ambient" aria-hidden="true">
        {hearts.map(([left, color, size, sway, dur, delay], i) => (
          <div key={i} className="ambient-heart" style={{ left: `${left}%`, color, fontSize: size, ["--sway" as string]: `${sway}px`, animation: `ambient-fall ${dur}s ease-in-out ${delay}s infinite` }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d={HEART} /></svg>
          </div>
        ))}
      </div>

      <div className="envelope-card-wrap">
        <div className="envelope-seal" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d={HEART} /></svg>
        </div>
        <div className="envelope-card">
          <div className="envelope-card-bg" aria-hidden="true">
            <img src="/theme/flower2-decoration.webp" alt="" className="envelope-flower envelope-flower-tl" />
            <img src="/theme/flower2-decoration.webp" alt="" className="envelope-flower envelope-flower-br" />
          </div>
          <div className="envelope-card-body">
            <h1 className="envelope-names">
              <span>{couple.groom.short}</span>
              <span className="envelope-amp">&amp;</span>
              <span>{couple.bride.short}</span>
            </h1>
            <div className="envelope-divider" aria-hidden="true"><i /><span>❦</span><i /></div>
            <p className="envelope-date">{mainDateLabel}</p>
            <p className="envelope-invites">{messages.invites}</p>
            <Link href="/invitation" className="envelope-open">
              <span>فتح الدعوة</span>
              <i className="envelope-shine" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
