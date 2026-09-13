import { NextRequest, NextResponse } from "next/server"
import { ACCESS_COOKIE, isValidAccessToken } from "./lib/authCookie"

export const config = { matcher: ["/invitation/:path*"] }

export async function proxy(req: NextRequest) {
  const secret = process.env.WEDDING_ACCESS_SECRET
  if (!secret) return NextResponse.next()

  const token = req.cookies.get(ACCESS_COOKIE)?.value
  if (await isValidAccessToken(token, secret)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = "/login"
  url.search = `?next=${encodeURIComponent(req.nextUrl.pathname)}`
  return NextResponse.redirect(url)
}
