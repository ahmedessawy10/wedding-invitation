// توقيع كوكي الدخول باستخدام Web Crypto (يعمل في middleware وفي مسارات الخادم)
export const ACCESS_COOKIE = "wedding_access"

const PAYLOAD = "granted"

async function sign(secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(PAYLOAD))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function createAccessToken(secret: string) {
  return sign(secret)
}

export async function isValidAccessToken(token: string | undefined | null, secret: string) {
  if (!token) return false
  const expected = await sign(secret)
  return token === expected
}
