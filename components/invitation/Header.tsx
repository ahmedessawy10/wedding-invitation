import { couple, heroPhoto, messages } from "../../lib/wedding"
import { Castle } from "./Card"

export function Header() {
  return (
    <header className="hero">
      <Castle top="26%" width="170%" />
      <p className="hero-kicker">{messages.saveTheDate}</p>

      <div className="hero-envelope">
        <div className="hero-envelope-box">
          <img src="/theme/envelope-background.webp" alt="" aria-hidden="true" className="hero-envelope-back" />
          <div className="hero-photo-wrap float" style={{ animationDuration: "6.5s", animationDelay: ".4s" }}>
            <div className="hero-photo">
              <img src={heroPhoto} alt={`${couple.groom.short} و ${couple.bride.short}`} />
            </div>
          </div>
          <span aria-hidden="true" className="hero-flower">
            <span className="float" style={{ animationDuration: "5s" }}>
              <img src="/theme/flower2-decoration.webp" alt="" />
            </span>
          </span>
          <img src="/theme/envelope-cover.webp" alt="" aria-hidden="true" className="hero-envelope-cover" />
        </div>
      </div>

      <div className="hero-names">
        <p>{couple.groom.short}</p>
        <span aria-hidden="true" className="hero-amp">&amp;</span>
        <p>{couple.bride.short}</p>
      </div>
    </header>
  )
}
