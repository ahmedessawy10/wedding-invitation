import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "../../../lib/supabase/server"
import { ACCESS_COOKIE, createAccessToken } from "../../../lib/authCookie"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""

  const secret = process.env.WEDDING_ACCESS_SECRET
  const admin = getSupabaseAdmin()
  if (!secret || !admin) {
    return NextResponse.json({ ok: false, error: "الخدمة غير مهيأة بعد، حاول لاحقًا" }, { status: 500 })
  }

  const { data, error } = await admin.from("wedding_access").select("password").eq("id", 1).single()
  if (error || !data || !password || password !== data.password) {
    return NextResponse.json({ ok: false, error: "كلمة المرور غير صحيحة" }, { status: 401 })
  }

  const token = await createAccessToken(secret)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 180,
    path: "/",
  })
  return res
}
