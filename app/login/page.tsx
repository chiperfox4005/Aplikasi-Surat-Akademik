'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FileText, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) {
      const session = await fetch('/api/auth/session').then(r => r.json())
      const role = session?.user?.role
      const redirectMap: Record<string, string> = {
        MAHASISWA: '/mahasiswa/dashboard', ADMIN: '/admin/dashboard',
        PRODI: '/prodi/dashboard', KAJUR: '/kajur/dashboard', PIMPINAN: '/pimpinan/dashboard'
      }
      router.push(redirectMap[role] ?? '/')
    } else {
      setError('Email atau password salah.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-3/5 bg-amber-600 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Surat Akademik</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-4">
            Sistem Pengajuan<br />Surat Akademik
          </h1>
          <p className="text-amber-100 text-sm mb-8 max-w-sm">
            Platform digital untuk pengelolaan surat akademik yang terstruktur, transparan, dan efisien.
          </p>
          <div className="space-y-3">
            {['Pengajuan surat secara online', 'Tracking status real-time', 'Arsip digital terpusat'].map(f => (
              <div key={f} className="flex items-center gap-2 text-amber-50 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-amber-200 text-xs">Versi 1.0 · Sistem Informasi Akademik</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col p-8 bg-[#FFFDF8] relative">
        <Link href="/" className="absolute top-8 right-8 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Masuk ke Akun</h2>
            <p className="text-sm text-gray-500">Gunakan kredensial yang diberikan oleh admin</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input-field" placeholder="nama@universitas.ac.id" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 mt-2">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}
