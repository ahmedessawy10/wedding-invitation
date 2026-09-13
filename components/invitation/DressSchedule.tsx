import { dressCode, schedule } from "../../lib/wedding"
import { Card, CardTitle } from "./Card"

// export function DressCode() {
//   return (
//     <div className="dress-section">
//       <h2>قواعد اللباس</h2>
//       <p>{dressCode.text}</p>
//       <div className="swatches">
//         {dressCode.colors.map((c) => <i key={c} style={{ background: c, border: c === "#F3E8DE" ? "1.5px solid rgba(81,20,25,.19)" : "none" }} />)}
//       </div>
//     </div>
//   )
// }

export function Schedule() {
  return (
    <Card flower={{ side: "right", top: "-12%", width: "30%", duration: "5.2s", delay: ".9s" }}>
      <CardTitle>برنامج </CardTitle>
      <ol className="schedule-list">
        {schedule.map((item, i) => (
          <li key={i}>
            <span className="schedule-time">
              {item.icon && (
                <span className="schedule-icon"><img src={item.icon} alt="" /></span>
              )}
              {item.time}
            </span>
            <span aria-hidden="true" className="schedule-dot">
              <i className={i === 0 ? "no-top" : ""} />
              <b />
              <i className={i === schedule.length - 1 ? "no-bottom" : ""} />
            </span>
            <span className="schedule-text">{item.text}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
