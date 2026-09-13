"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LockKeyhole } from "lucide-react"
import { couple, mainDateLabel } from "../../lib/wedding"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.ok) {
        router.push(searchParams.get("next") || "/invitation")
        router.refresh()
      } else {
        setError(data.error || "كلمة المرور غير صحيحة")
      }
    } catch {
      setError("تعذّر الاتصال الآن، حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="envelope-screen">
      <div className="envelope-card-wrap">
        <div className="envelope-seal" aria-hidden="true">
          <LockKeyhole size={26} color="var(--paper)" />
        </div>
        <div className="envelope-card">
          <div className="envelope-card-body">
            <h1 className="envelope-names">
              <span>{couple.groom.short}</span>
              <span className="envelope-amp">&amp;</span>
              <span>{couple.bride.short}</span>
            </h1>
            <div className="envelope-divider" aria-hidden="true"><i /><span>❦</span><i /></div>
            <p className="envelope-date">{mainDateLabel}</p>
            <p className="envelope-invites">الدعوة خاصة، أدخل كلمة المرور للمتابعة</p>
            <form className="login-form" onSubmit={submit}>
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="btn-burgundy" disabled={loading}>
                {loading ? "جارٍ التحقق..." : "دخول"}
              </button>
              {error && <p className="form-error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
