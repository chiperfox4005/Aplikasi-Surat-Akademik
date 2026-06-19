'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import { FileText, Clock, CheckCircle, Plus, BarChart2 } from 'lucide-react'

export default function MahasiswaDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, baru: 0, diproses: 0, selesai: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/pengajuan').then(r => r.json()),
      fetch('/api/stats').then(r => r.json()),
    ]).then(([data, s]) => { setList(data); setStats(s); setLoading(false) })
  }, [])

  const user = session?.user as any
  if (!user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader
          title="Dashboard"
          subtitle="Selamat datang, pantau status pengajuan surat Anda di sini."
          breadcrumb={['Beranda', 'Dashboard']}
          action={
            <Link href="/mahasiswa/ajukan" className="btn-primary flex items-center gap-2">
              <Plus size={15} /> Ajukan Surat Baru
            </Link>
          }
        />

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Pengajuan" value={stats.total} icon={FileText} accent="border-amber-400" />
          <StatCard label="Menunggu" value={stats.baru} icon={Clock} accent="border-blue-400" />
          <StatCard label="Sedang Diproses" value={stats.diproses} icon={BarChart2} accent="border-indigo-400" />
          <StatCard label="Selesai" value={stats.selesai} icon={CheckCircle} accent="border-green-400" />
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="section-label">Riwayat Pengajuan</p>
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-gray-400">Memuat data...</div>
          ) : list.length === 0 ? (
            <EmptyState title="Belum ada pengajuan" desc="Klik tombol Ajukan Surat Baru untuk memulai." />
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left">Jenis Surat</th>
                  <th className="table-header text-left">Status</th>
                  <th className="table-header text-left">Tanggal</th>
                  <th className="table-header text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item: any) => (
                  <tr key={item.id}>
                    <td className="table-row font-medium">{item.jenisSurat}</td>
                    <td className="table-row"><StatusBadge status={item.status} /></td>
                    <td className="table-row">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                    <td className="table-row">
                      <Link href={`/mahasiswa/pengajuan/${item.id}`} className="btn-outline py-1 px-3 text-xs">
                        Detail
                      </Link>
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
