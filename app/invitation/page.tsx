import { Invitation } from "../../components/invitation/Invitation"
import { couple, mainDateLabel } from "../../lib/wedding"

export const metadata = {
  title: `${couple.groom.short} & ${couple.bride.short} | تفاصيل الدعوة`,
  description: `تفاصيل حفل زفاف ${couple.groom.short} و${couple.bride.short} — ${mainDateLabel}`,
}

export default function InvitationPage() {
  return <Invitation />
}
