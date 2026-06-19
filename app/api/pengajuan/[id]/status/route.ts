import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Status } from '@prisma/client'

const transitions: Record<string, Record<string, Status>> = {
  ADMIN:   { BARU: 'DIPERIKSA', DIPERIKSA: 'BARU', DITANDATANGANI: 'DITERIMA' },
  PRODI:   { DIPERIKSA: 'DIVERIFIKASI', DIVERIFIKASI: 'DIPERIKSA' },
  KAJUR:   { DIVERIFIKASI: 'DIPROSES', DIPROSES: 'DITANDATANGANI' },
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const role = (session.user as any).role
  const email = session.user?.email!
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { catatan, targetStatus, nomorSurat } = await req.json()
  const pengajuan = await db.pengajuan.findUnique({ where: { id: params.id } })
  if (!pengajuan) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const allowed = transitions[role]?.[pengajuan.status]
  const newStatus: Status = targetStatus ?? allowed
  if (!newStatus) return NextResponse.json({ error: 'Transisi tidak diizinkan' }, { status: 403 })

  const updateData: any = { status: newStatus, catatan: catatan ?? pengajuan.catatan }
  if (nomorSurat) updateData.nomorSurat = nomorSurat

  const updated = await db.pengajuan.update({
    where: { id: params.id },
    data: updateData
  })
  await db.riwayat.create({ data: { pengajuanId: params.id, status: newStatus, aktor: user.name, catatan } })
  return NextResponse.json(updated)
}
