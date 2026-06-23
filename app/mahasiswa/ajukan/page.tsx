'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import { Upload, ArrowRight } from 'lucide-react'

const jenisList = ['Keterangan Aktif','Transkrip Nilai','Pengantar PKL','Surat Rekomendasi','Lainnya']

export default function AjukanPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({ jenisSurat: '', keperluan: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const user = session?.user as any

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.jenisSurat) { setError('Pilih jenis surat terlebih dahulu.'); return }
    setLoading(true)
    await fetch('/api/pengajuan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    router.push('/mahasiswa/dashboard')
  }

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Ajukan Surat" subtitle="Isi formulir pengajuan surat akademik" breadcrumb={['Beranda','Ajukan Surat']} />
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card p-6 space-y-5">
              <p className="section-label">Informasi Surat</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis Surat</label>
                <select value={form.jenisSurat} onChange={e => setForm({...form, jenisSurat: e.target.value})} className="input-field">
                  <option value="">-- Pilih jenis surat --</option>
                  {jenisList.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Keperluan</label>
                <textarea rows={4} value={form.keperluan}
                  onChange={e => setForm({...form, keperluan: e.target.value})}
                  placeholder="Jelaskan keperluan pengajuan surat ini..."
                  className="input-field resize-none" required />
              </div>
            </div>

            <div className="card p-6">
              <p className="section-label">Dokumen Pendukung</p>
              <label className="border-2 border-dashed border-amber-300/50 bg-amber-50/30 rounded-xl p-8 text-center hover:border-amber-400 hover:bg-amber-50/50 transition-colors cursor-pointer block group">
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {
                  // TODO: Handle file upload
                  console.log(e.target.files)
                }} />
                <Upload size={28} className="mx-auto text-amber-500/50 group-hover:text-amber-500 mb-3 transition-colors" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Klik untuk memilih atau seret file ke sini</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Maks. 5MB (opsional)</p>
              </label>
            </div>

            {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                {loading ? 'Mengirim...' : <><span>Kirim Pengajuan</span><ArrowRight size={15} /></>}
              </button>
              <button type="button" onClick={() => router.back()} className="btn-ghost">Batal</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
