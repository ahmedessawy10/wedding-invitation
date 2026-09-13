// كل بيانات الدعوة في مكان واحد — عدّل هنا فقط.

export const theme = {
  burgundy: "#511419",
  cream: "#ece4d8",
  paper: "#fff7eb",
  gold: "#c9a24a",
}

export const couple = {
  groom: { title: "مهندس", name: "مصعب بدر أحمد عبد الدايم", short: "مصعب" },
  bride: { title: "الآنسة", name: "أمل", short: "أمل", degree: "بكالوريوس تمريض" },
}

export const families = {
  groom: {
    label: "أسرة العريس",
    members: ["الشيخ / بدر أحمد بدر عبدالدايم", "مهندس / عبدالله بدر أحمد عبد الدايم"],
  },
  bride: {
    label: "أسرة العروس",
    members: [
      "الحاج / إبراهيم حامد عبد النبي خلاف",
      "الشيخ / صبحي حامد عبد النبي خلاف",
      "الحاج / عبد المنعم حامد عبد النبي خلاف",
      "الأستاذ / هاني حامد عبد النبي خلاف",
      "مهندس / محمد صبحي حامد خلاف",
    ],
  },
}

export type WeddingEvent = {
  key: "henna" | "ishhar"
  title: string
  day: string
  dayNumber: number
  monthName: string
  year: number
  timeLabel: string
  venue: string
  address: string
  mapsLink: string
  lat: number
  lng: number
}

export const events: Record<WeddingEvent["key"], WeddingEvent> = {
  henna: {
    key: "henna",
    title: "حفل الحنّة",
    day: "الأربعاء",
    dayNumber: 16,
    monthName: "سبتمبر",
    year: 2026,
    timeLabel: "مساءً",
    venue: "مكان حفل الحنّة",
    address: "المكان على خرائط جوجل",
    mapsLink: "https://maps.app.goo.gl/PpQjzvRdNAkdtmqV6",
    lat: 30.776274,
    lng: 31.020543,
  },
  ishhar: {
    key: "ishhar",
    title: "حفل الإشهار",
    day: "الجمعة",
    dayNumber: 18,
    monthName: "سبتمبر",
    year: 2026,
    timeLabel: "بعد صلاة المغرب",
    venue: "مسجد الشيخ خلف",
    address: "مسجد الشيخ خلف",
    mapsLink: "https://maps.app.goo.gl/Kkc6kbqXTsDytScD6",
    lat: 30.7770316,
    lng: 31.0200498,
  },
}

// موعد الإشهار (يُستخدم للعدّ التنازلي وإضافة التقويم) — مغرب القاهرة ≈ 18:00 بتوقيت +03:00
export const mainDateISO = "2026-09-18T18:00:00+03:00"
export const mainDateLabel = "١٨ سبتمبر ٢٠٢٦"

export const calendarMonth = { year: 2026, month: 8, label: "سبتمبر ٢٠٢٦", highlight: [16, 18], main: 18 } // month is 0-based

export const schedule = [
  { time: "16 / 9", text: "حفل الحنّة — الأربعاء", icon: "" },
  { time: "18 / 9", text: "صلاة المغرب — الجمعة", icon: "/theme/camera.webp" },
  { time: "بعدها", text: "عقد القران والإشهار بمسجد الشيخ خلف", icon: "/theme/cake.webp" },
  { time: "ثم", text: "استقبال المهنئين", icon: "/theme/cook.webp" },
  { time: "الختام", text: "شكرًا لحضوركم ومشاركتكم فرحتنا", icon: "" },
]

export const dressCode = {
  text: "ملابس رسمية / سهرة",
  colors: ["#5C1420", "#2B2B2B", "#C9A24A", "#F3E8DE"],
}

// صور الألبوم — ضع صورك في public/gallery وعدّل المسارات هنا
export const gallery = ["/gallery/1.svg", "/gallery/2.svg", "/gallery/3.svg", "/gallery/4.svg", "/gallery/5.svg"]

// صورة المغلف في أعلى الدعوة
export const heroPhoto = "/gallery/1.svg"

// وسائل إرسال الهدية — عدّل الأرقام هنا (اتركها فارغة لإخفاء البطاقة)
export const gifts = [
  { label: "فودافون كاش", value: "", note: "حوّل عبر تطبيق فودافون كاش" },
  { label: "إنستاباي", value: "", note: "حوّل عبر تطبيق InstaPay" },
]

export const messages = {
  saveTheDate: "Save The Date",
  invites: "يتشرفان بدعوتكم",
  announce: "بقلوب مفعمة بالفرح نعلن\nزفاف ولدينا",
  groomLabel: "العريس",
  brideLabel: "العروس",
  footer: "حضوركم هو أجمل هدية نتلقاها!",
  thanks: "شكرًا لمشاركتكم فرحتنا",
}

export function googleCalendarUrl() {
  const title = encodeURIComponent(`زفاف ${couple.groom.short} و ${couple.bride.short}`)
  const details = encodeURIComponent(`حفل الإشهار بمسجد الشيخ خلف بعد صلاة المغرب`)
  const location = encodeURIComponent(events.ishhar.venue)
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260918T150000Z/20260918T180000Z&details=${details}&location=${location}`
}

export function mapEmbedUrl(e: WeddingEvent) {
  return `https://maps.google.com/maps?q=${e.lat},${e.lng}&z=17&hl=ar&output=embed`
}
