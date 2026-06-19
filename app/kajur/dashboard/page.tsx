'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import { PenLine, Clock, CheckCircle } from 'lucide-react'

export default function KajurDashboard() {
  const { data: session } = useSession()
  const [list, setList] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, baru: 0, diproses: 0, selesai: 0 })
  const user = session?.user as any

  useEffect(() => {
    fetch('/api/pengajuan?status=DIPROSES').then(r => r.json()).then(setList)
    fetch('/api/stats').then(r => r.json()).then(setStats)
  }, [])

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Dashboard Ketua Jurusan" subtitle="Tanda tangani surat yang telah diverifikasi dan diproses" />

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Menunggu TTD" value={list.length} icon={PenLine} accent="border-orange-400" />
          <StatCard label="Sedang Diproses" value={stats.diproses} icon={Clock} accent="border-amber-400" />
          <StatCard label="Selesai" value={stats.selesai} icon={CheckCircle} accent="border-green-400" />
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="section-label">Surat Menunggu Tanda Tangan</p>
          </div>
          {list.length === 0 ? <EmptyState title="Tidak ada surat untuk ditandatangani" /> : (
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
                      <Link href={`/kajur/pengajuan/${item.id}`} className="btn-outline py-1 px-3 text-xs">Tanda Tangani</Link>
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
