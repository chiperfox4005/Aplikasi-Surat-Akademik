import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const role = (session.user as any).role
  const email = session.user?.email!
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const status = req.nextUrl.searchParams.get('status')
  const where: any = role === 'MAHASISWA' ? { userId: user.id } : {}
  if (status) where.status = status

  const data = await db.pengajuan.findMany({
    where, include: { user: { select: { name: true, nim: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const email = session.user?.email!
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  const item = await db.pengajuan.create({
    data: { jenisSurat: body.jenisSurat, keperluan: body.keperluan, userId: user.id, status: 'BARU' }
  })
  await db.riwayat.create({ data: { pengajuanId: item.id, status: 'BARU', aktor: user.name } })
  return NextResponse.json(item)
}
