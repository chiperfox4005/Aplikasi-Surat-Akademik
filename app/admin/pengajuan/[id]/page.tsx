'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import TimelineStatus from '@/components/TimelineStatus'

export default function AdminDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const [catatan, setCatatan] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = session?.user as any

  useEffect(() => { fetch(`/api/pengajuan/${params.id}`).then(r => r.json()).then(setData) }, [params.id])

  async function updateStatus(targetStatus: string) {
    setLoading(true)
    await fetch(`/api/pengajuan/${params.id}/status`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ catatan, targetStatus })
    })
    router.push('/admin/dashboard')
  }

  if (!user || !data) return <div className="ml-64 p-8 text-sm text-gray-400">Memuat...</div>
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Periksa Pengajuan" breadcrumb={['Dashboard','Detail']} />
        <div className="max-w-3xl space-y-5">
          <div className="card p-6"><TimelineStatus current={data.status} /></div>
          <div className="card p-6">
            <p className="section-label">Informasi Pengajuan</p>
            <dl className="grid grid-cols-2 gap-4">
              {[['Mahasiswa', data.user?.name],['NIM', data.user?.nim ?? '-'],['Jenis Surat', data.jenisSurat],['Status', <StatusBadge key="status" status={data.status} />]].map(([k, v]: any) => (
                <div key={String(k)}><dt className="text-xs text-gray-400 mb-0.5">{k}</dt><dd className="text-sm font-medium text-gray-800">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-4"><dt className="text-xs text-gray-400 mb-0.5">Keperluan</dt><dd className="text-sm text-gray-700">{data.keperluan}</dd></div>
          </div>
          <div className="card p-6">
            <p className="section-label">Catatan Admin</p>
            <textarea rows={3} value={catatan} onChange={e => setCatatan(e.target.value)}
              placeholder="Tambahkan catatan (opsional)..." className="input-field resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => updateStatus('DIPERIKSA')} disabled={loading} className="btn-primary px-6 py-2.5">
              Lanjut ke Verifikasi
            </button>
            <button onClick={() => updateStatus('BARU')} disabled={loading} className="btn-outline px-6 py-2.5">
              Minta Revisi
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
