'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'

const tabs = ['Semua','BARU','DIPERIKSA','DIVERIFIKASI','DIPROSES','DITANDATANGANI','DITERIMA','DIARSIPKAN']

export default function AdminPengajuan() {
  const { data: session } = useSession()
  const [list, setList] = useState<any[]>([])
  const [tab, setTab] = useState('Semua')
  const user = session?.user as any

  useEffect(() => {
    const q = tab === 'Semua' ? '' : `?status=${tab}`
    fetch(`/api/pengajuan${q}`).then(r => r.json()).then(setList)
  }, [tab])

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Semua Pengajuan" subtitle="Daftar seluruh pengajuan surat akademik" />

        <div className="card">
          <div className="px-5 py-3 border-b border-gray-100 flex gap-1 overflow-x-auto">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors
                  ${tab === t ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                {t === 'Semua' ? 'Semua' : t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          {list.length === 0 ? <EmptyState /> : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left">Mahasiswa</th>
                  <th className="table-header text-left">Jenis Surat</th>
                  <th className="table-header text-left">Status</th>
                  <th className="table-header text-left">Tanggal</th>
                  <th className="table-header text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item: any) => (
                  <tr key={item.id}>
                    <td className="table-row font-medium">{item.user?.name}</td>
                    <td className="table-row">{item.jenisSurat}</td>
                    <td className="table-row"><StatusBadge status={item.status} /></td>
                    <td className="table-row">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                    <td className="table-row">
                      <Link href={`/admin/pengajuan/${item.id}`} className="btn-outline py-1 px-3 text-xs">Periksa</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
