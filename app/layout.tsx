import type { Metadata } from "next"
import { Cormorant_Garamond, Noto_Naskh_Arabic } from "next/font/google"
import "./globals.css"

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display" })
const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "فهد & لؤلؤة | دعوة زفاف",
  description: "دعوة زفاف فهد ولؤلؤة — 30 أبريل 2027",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" className="bg-[#b78243]"><body className={`${display.variable} ${arabic.variable}`}>{children}</body></html>
}
