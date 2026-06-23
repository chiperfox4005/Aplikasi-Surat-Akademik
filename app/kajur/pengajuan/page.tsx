'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'

export default function KajurPengajuan() {
  const { data: session } = useSession()
  const [list, setList] = useState<any[]>([])
  const user = session?.user as any

  useEffect(() => {
    fetch('/api/pengajuan?status=DIPROSES').then(r => r.json()).then(setList)
  }, [])

  if (!user) return null
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} name={user.name ?? ''} />
      <main className="ml-64 flex-1 px-8 py-8">
        <PageHeader title="Daftar Tanda Tangan" subtitle="Tanda tangani surat yang telah diverifikasi dan diproses" />

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
