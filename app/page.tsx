"use client"

import { useState } from "react"
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Gift, Heart, MapPin, Music2, Send, Volume2, VolumeX } from "lucide-react"

const guests = [
  { name: "نورة السالم", note: "ربينا يتم لكم على خير ويسعد قلوبكم." },
  { name: "مريم الشعري", note: "أجمل التهاني بمناسبة الزفاف، دام لكم الود والوئام." },
  { name: "عمر الغنيمي", note: "كل عام وأنتم بخير وسعادة، مبارك عليكما." },
]

export default function Home() {
  const [opened, setOpened] = useState(false)
  const [muted, setMuted] = useState(true)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#b78243] text-[#7f572d]">
      {!opened && <OpeningScreen onOpen={() => setOpened(true)} />}
      {opened && (
        <div className="invite-shell animate-reveal">
          <button aria-label={muted ? "تشغيل الموسيقى" : "إيقاف الموسيقى"} className="sound-button" onClick={() => setMuted(!muted)}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <Hero />
          <Couple />
          <EventDetails />
          <Gallery />
          <Venue />
          <DressCode />
          <Timeline />
          <Guestbook message={message} setMessage={setMessage} sent={sent} onSend={() => { if (message.trim()) setSent(true) }} />
          <GiftSection />
          <footer className="footer">صُنع بحب من أجل يوم لا يُنسى <Heart size={13} fill="currentColor" /></footer>
        </div>
      )}
    </main>
  )
}

function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  return <section className="opening-screen"><div className="opening-card">
    <span className="corner-flower top-left" /><span className="corner-flower bottom-right" />
    <div className="seal"><Heart size={29} fill="white" strokeWidth={0} /></div>
    <p className="opening-kicker">دعوة زفاف</p><h1>فهد <span>&</span> لؤلؤة</h1><div className="ornament-line"><i /> ❦ <i /></div>
    <p className="opening-date">30 أبريل 2027</p><p className="opening-sub">بدعوة كريمة نشارككم فرحتنا</p>
    <button className="gold-button open-button" onClick={onOpen}>فتح الدعوة</button>
  </div></section>
}

function Hero() { return <section className="hero section-frame"><p className="eyebrow">WELCOME TO OUR WEDDING</p><div className="hero-frame"><div className="flourish">❧</div><h1>فهد <small>&</small> لؤلؤة</h1><p>بسم الله الرحمن الرحيم</p><div className="flourish">❧</div></div><p className="hero-welcome">يسعدنا أن نشارككم أجمل لحظاتنا</p></section> }

function Couple() { return <section className="couple section-frame"><SectionTitle title="بكل حب ندعوكم" /><p className="intro">لحضور حفل زفافنا ومشاركتنا بداية فصل جديد من حكايتنا</p><div className="couple-names"><div><span>العريس</span><h2>فهد بن مشعل</h2></div><b>&</b><div><span>العروس</span><h2>لؤلؤة بنت جاسم</h2></div></div></section> }

function EventDetails() { return <section className="details section-frame"><SectionTitle title="معلومات الحفل" /><div className="detail-grid"><div><CalendarDays /><span>التاريخ</span><strong>الجمعة<br />30 أبريل 2027</strong></div><div><Music2 /><span>الوقت</span><strong>استقبال الضيوف 19:30<br />بداية الحفل 20:00</strong></div><div><MapPin /><span>المكان</span><strong>فندق جميرا<br />شاطئ المسيلة، الكويت</strong></div></div><div className="countdown"><p>باقي على فرحتنا</p><div><b>229</b><span>يوم</span><b>20</b><span>ساعة</span><b>36</b><span>دقيقة</span></div></div></section> }

function Gallery() { return <section className="gallery section-frame"><SectionTitle title="من أجمل ذكرياتنا" /><div className="gallery-grid"><img src="/images/wedding-reference.jpeg" alt="تصميم دعوة الزفاف" /><div className="gallery-note"><span>Our story</span><h2>لحظاتنا<br />الأجمل</h2><p>كل صورة تحكي جزءاً من الحكاية التي نعيشها معاً.</p><button aria-label="الصورة التالية" className="circle-button"><ChevronLeft size={20} /></button></div></div></section> }

function Venue() { return <section className="venue section-frame"><SectionTitle title="مكان حفل الاستقبال" /><p>فندق جميرا شاطئ المسيلة الكويت</p><div className="map-card"><div className="map-roads"><span /><span /><span /><span /><MapPin size={43} fill="#b87836" color="#fff" /></div></div><a className="directions" href="https://maps.google.com" target="_blank" rel="noreferrer">الحصول على الاتجاهات <ChevronLeft size={16} /></a></section> }

function DressCode() { return <section className="dress section-frame"><SectionTitle title="قواعد اللباس" /><p>ملابس الحفل</p><div className="swatches"><i /><i /><i /></div></section> }

function Timeline() { return <section className="timeline section-frame"><SectionTitle title="برنامج اليوم" /><div className="timeline-list">{[["17:30", "استقبال الضيوف"], ["18:30", "بدء الحفل"], ["18:45", "نخب وقطع الكعكة"], ["19:00", "العشاء الرئيسي"], ["21:00", "ختام الحفل"]].map(([time, title]) => <div key={time}><time>{time}</time><i /><span>{title}</span></div>)}</div></section> }

function Guestbook({ message, setMessage, sent, onSend }: { message: string, setMessage: (v: string) => void, sent: boolean, onSend: () => void }) { return <section className="guestbook section-frame"><SectionTitle title="سجل التهاني" /><div className="guest-form"><input aria-label="اسمك" placeholder="أدخل اسمك *" /><textarea aria-label="تهنئتك" placeholder="اكتب تهنئتك *" value={message} onChange={(e) => setMessage(e.target.value)} /><button className="gold-button" onClick={onSend}><Send size={15} /> إرسال التهنئة</button>{sent && <p className="success">تم إرسال تهنئتك بكل محبة.</p>}</div><div className="guest-list">{guests.map((guest) => <article key={guest.name}><b>{guest.name}</b><small>2026/7/13 · 12:17 م</small><p>{guest.note}</p></article>)}</div></section> }

function GiftSection() { return <section className="gift section-frame"><SectionTitle title="صندوق الهدية" /><div className="gift-box"><Gift size={62} strokeWidth={1} /><span>اضغط للفتح</span></div><p>شكراً لحضوركم، وجودكم هو أجمل هدية لنا.</p></section> }

function SectionTitle({ title }: { title: string }) { return <div className="section-title"><span>✧</span><h2>{title}</h2><span>✧</span></div> }
