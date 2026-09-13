import type { Metadata, Viewport } from "next"
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, The_Nautigal } from "next/font/google"
import { couple, mainDateLabel } from "../lib/wedding"
import "./globals.css"

const body = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-body" })
const names = Aref_Ruqaa({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-names" })
const latin = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-latin" })
const script = The_Nautigal({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-script" })

export const metadata: Metadata = {
  title: `${couple.groom.short} & ${couple.bride.short} | دعوة زفاف`,
  description: `دعوة زفاف ${couple.groom.short} و${couple.bride.short} — ${mainDateLabel}`,
}

export const viewport: Viewport = { themeColor: "#511419", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${body.variable} ${names.variable} ${latin.variable} ${script.variable}`}>{children}</body>
    </html>
  )
}
