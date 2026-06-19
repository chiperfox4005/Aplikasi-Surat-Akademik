'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { FileText, LayoutDashboard, PlusCircle, Archive, Users, BarChart2, LogOut, ChevronUp, ChevronDown } from 'lucide-react'

const navMap: Record<string, { href: string; label: string; icon: any }[]> = {
  MAHASISWA: [
    { href: '/mahasiswa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/mahasiswa/ajukan', label: 'Ajukan Surat', icon: PlusCircle },
  ],
  ADMIN: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/pengajuan', label: 'Semua Pengajuan', icon: FileText },
  ],
  PRODI: [
    { href: '/prodi/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/prodi/pengajuan', label: 'Verifikasi', icon: Users },
  ],
  KAJUR: [
    { href: '/kajur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/kajur/pengajuan', label: 'Tanda Tangan', icon: Archive },
  ],
  PIMPINAN: [
    { href: '/pimpinan/dashboard', label: 'Monitoring', icon: BarChart2 },
  ],
}

export default function Sidebar({ role, name }: { role: string; name: string }) {
  const path = usePathname()
  const [showLogout, setShowLogout] = useState(false)
  const navItems = navMap[role] ?? []
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const roleLabel: Record<string, string> = {
    MAHASISWA: 'Mahasiswa', ADMIN: 'Admin Akademik', PRODI: 'Program Studi',
    KAJUR: 'Ketua Jurusan', PIMPINAN: 'Pimpinan'
  }
  
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-40">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">Surat Akademik</p>
            <p className="text-xs text-gray-400 mt-0.5">Sistem Pengajuan</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="section-label px-3 mb-2">Menu</p>
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`sidebar-item ${path.startsWith(href) ? 'active' : ''}`}>
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-100 relative">
        {showLogout && (
          <div className="absolute bottom-[100%] left-4 right-4 mb-2 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden z-50">
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        )}
        <button 
          onClick={() => setShowLogout(!showLogout)}
          className="w-full flex items-center gap-3 text-left hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
            <p className="text-xs text-gray-400">{roleLabel[role]}</p>
          </div>
          <div className="text-gray-400">
            {showLogout ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </button>
      </div>
    </aside>
  )
}
