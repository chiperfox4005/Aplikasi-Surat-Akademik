'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import { Inbox, Loader, CheckCircle } from 'lucide-react'

const tabs = ['Semua','BARU','DIPERIKSA','DIVERIFIKASI','DIPROSES','DITANDATANGANI','DITERIMA','DIARSIPKAN']

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [list, setList] = useState<any[]>([])
  const [stats, setStats] = useState({ baru: 0, diproses: 0, selesai: 0 })
  const [tab, setTab] = useState('Semua')
  const user = session?.user as any

  useEffect(() => {
    const q = tab === 'Semua' ? '' : `?status=${tab}`
    fetch(`/api/pengajuan${q}`).then(r => r.json()).then(setList)
    fetch('/api/stats').then(r => r.json()).then(setStats)
  }, [tab])

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Dashboard Admin" subtitle="Kelola antrian pengajuan surat mahasiswa" />

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Antrian Baru" value={stats.baru} icon={Inbox} accent="border-amber-400" />
          <StatCard label="Sedang Diproses" value={stats.diproses} icon={Loader} accent="border-blue-400" />
          <StatCard label="Selesai" value={stats.selesai} icon={CheckCircle} accent="border-green-400" />
        </div>

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
