import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const db = new PrismaClient()
const hash = (p: string) => bcrypt.hashSync(p, 10)

async function main() {
  await db.user.createMany({
    data: [
      { name: 'Budi Mahasiswa', email: 'mahasiswa@test.com', password: hash('password123'), role: 'MAHASISWA', nim: '2021001' },
      { name: 'Siti Admin', email: 'admin@test.com', password: hash('password123'), role: 'ADMIN' },
      { name: 'Dr. Prodi', email: 'prodi@test.com', password: hash('password123'), role: 'PRODI' },
      { name: 'Prof. Kajur', email: 'kajur@test.com', password: hash('password123'), role: 'KAJUR' },
      { name: 'Rektor', email: 'pimpinan@test.com', password: hash('password123'), role: 'PIMPINAN' },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Seed selesai — 5 user dibuat')
}

main().catch(console.error).finally(() => db.$disconnect())
