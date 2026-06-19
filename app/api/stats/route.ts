import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const role = (session.user as any).role
  const email = session.user?.email!
  const user = await db.user.findUnique({ where: { email } })

  const where = role === 'MAHASISWA' ? { userId: user?.id } : {}
  const [total, baru, diproses, selesai] = await Promise.all([
    db.pengajuan.count({ where }),
    db.pengajuan.count({ where: { ...where, status: 'BARU' } }),
    db.pengajuan.count({ where: { ...where, status: { in: ['DIPERIKSA','DIVERIFIKASI','DIPROSES'] } } }),
    db.pengajuan.count({ where: { ...where, status: { in: ['DITANDATANGANI','DITERIMA','DIARSIPKAN'] } } }),
  ])
  return NextResponse.json({ total, baru, diproses, selesai })
}
