'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { FileText, Clock, CheckCircle } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  BARU: 'Baru', DIPERIKSA: 'Diperiksa', DIVERIFIKASI: 'Diverifikasi',
  DIPROSES: 'Diproses', DITANDATANGANI: 'Ditandatangani', DITERIMA: 'Diterima', DIARSIPKAN: 'Diarsipkan',
}

export default function PimpinanDashboard() {
  const { data: session } = useSession()
  const [list, setList] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, baru: 0, diproses: 0, selesai: 0 })
  const [search, setSearch] = useState('')
  const user = session?.user as any

  useEffect(() => {
    fetch('/api/pengajuan').then(r => r.json()).then(data => { setList(data); setFiltered(data) })
    fetch('/api/stats').then(r => r.json()).then(setStats)
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(list.filter(item =>
      item.user?.name?.toLowerCase().includes(q) ||
      item.jenisSurat?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q)
    ))
  }, [search, list])

  // Build chart data
  const statusCounts = Object.keys(STATUS_LABELS).map(s => ({
    name: STATUS_LABELS[s],
    total: list.filter(i => i.status === s).length,
  }))

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Monitoring Pengajuan" subtitle="Pantau seluruh aktivitas pengajuan surat akademik" />

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Pengajuan" value={stats.total} icon={FileText} accent="border-amber-400" />
          <StatCard label="Sedang Diproses" value={stats.diproses} icon={Clock} accent="border-blue-400" />
          <StatCard label="Selesai" value={stats.selesai} icon={CheckCircle} accent="border-green-400" />
        </div>

        {/* Bar Chart */}
        <div className="card p-6 mb-6">
          <p className="section-label">Distribusi Status Pengajuan</p>
          <div className="mt-4" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusCounts} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
                  cursor={{ fill: '#FEF3C7' }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#D97706" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="section-label mb-0">Semua Pengajuan</p>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari mahasiswa, jenis, status..."
              className="input-field w-64"
            />
          </div>
          {filtered.length === 0 ? <EmptyState title="Tidak ada data yang cocok" /> : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left">Mahasiswa</th>
                  <th className="table-header text-left">NIM</th>
                  <th className="table-header text-left">Jenis Surat</th>
                  <th className="table-header text-left">Status</th>
                  <th className="table-header text-left">Nomor Surat</th>
                  <th className="table-header text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item: any) => (
                  <tr key={item.id}>
                    <td className="table-row font-medium">{item.user?.name}</td>
                    <td className="table-row text-gray-500">{item.user?.nim ?? '-'}</td>
                    <td className="table-row">{item.jenisSurat}</td>
                    <td className="table-row"><StatusBadge status={item.status} /></td>
                    <td className="table-row">{item.nomorSurat ?? '-'}</td>
                    <td className="table-row">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
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
