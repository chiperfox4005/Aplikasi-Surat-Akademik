'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import TimelineStatus from '@/components/TimelineStatus'
import StatusBadge from '@/components/StatusBadge'
import { Download } from 'lucide-react'

export default function DetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const user = session?.user as any

  useEffect(() => {
    fetch(`/api/pengajuan/${params.id}`).then(r => r.json()).then(setData)
  }, [params.id])

  if (!user || !data) return <div className="ml-64 p-8 text-sm text-gray-400">Memuat...</div>
  const canDownload = ['DITANDATANGANI','DITERIMA','DIARSIPKAN'].includes(data.status)

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Detail Pengajuan" breadcrumb={['Beranda','Riwayat','Detail']}
          action={canDownload ? <a href={`/api/pengajuan/${params.id}/download`} className="btn-primary flex items-center gap-2"><Download size={15} />Unduh Surat</a> : undefined} />

        <div className="max-w-3xl space-y-5">
          <div className="card p-6">
            <p className="section-label">Status Pengajuan</p>
            <TimelineStatus current={data.status} />
          </div>

          <div className="card p-6">
            <p className="section-label">Informasi Surat</p>
            <dl className="grid grid-cols-2 gap-4 mt-2">
              {[
                ['Jenis Surat', data.jenisSurat],
                ['Status', <StatusBadge key="status" status={data.status} />],
                ['Nomor Surat', data.nomorSurat ?? '-'],
                ['Tanggal Pengajuan', new Date(data.createdAt).toLocaleDateString('id-ID')],
              ].map(([k, v]: any) => (
                <div key={String(k)}>
                  <dt className="text-xs text-gray-400 mb-0.5">{k}</dt>
                  <dd className="text-sm font-medium text-gray-800">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <dt className="text-xs text-gray-400 mb-0.5">Keperluan</dt>
              <dd className="text-sm text-gray-700 leading-relaxed">{data.keperluan}</dd>
            </div>
          </div>

          {data.riwayat?.length > 0 && (
            <div className="card p-6">
              <p className="section-label">Riwayat Aktivitas</p>
              <div className="space-y-3 mt-2">
                {data.riwayat.map((r: any) => (
                  <div key={r.id} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">{r.aktor}</span>
                      <span className="text-gray-400 mx-1">·</span>
                      <StatusBadge status={r.status} />
                      {r.catatan && <p className="text-gray-500 text-xs mt-0.5">{r.catatan}</p>}
                      <p className="text-gray-400 text-xs">{new Date(r.createdAt).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
