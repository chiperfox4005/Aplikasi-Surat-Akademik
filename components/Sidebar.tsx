'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { FileText, LayoutDashboard, PlusCircle, Archive, Users, BarChart2, LogOut, ChevronUp, ChevronDown, Menu, X } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)
  const navItems = navMap[role] ?? []
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const roleLabel: Record<string, string> = {
    MAHASISWA: 'Mahasiswa', ADMIN: 'Admin Akademik', PRODI: 'Program Studi',
    KAJUR: 'Ketua Jurusan', PIMPINAN: 'Pimpinan'
  }
  
  return (
    <>
      {/* Mobile Header (Hidden on md up) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white/60 backdrop-blur-xl border-b border-white/40 z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
            <FileText size={16} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-900 leading-none">Surat Akademik</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-gray-700 bg-white/50 rounded-lg backdrop-blur-md">
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/60 backdrop-blur-2xl border-r border-white/50 flex flex-col z-50 transition-transform duration-300 ease-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 py-6 border-b border-gray-200/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-amber-600/20">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 leading-none tracking-tight">Surat Akademik</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Sistem Pengajuan</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 hover:bg-gray-200/50 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="section-label px-3 mb-4">Menu Utama</p>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)}
              className={`sidebar-item ${path.startsWith(href) ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t border-gray-200/50 relative">
          {showLogout && (
            <div className="absolute bottom-[100%] left-4 right-4 mb-2 bg-white/90 backdrop-blur-xl border border-white rounded-xl shadow-xl overflow-hidden z-50">
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50/80 flex items-center gap-3 transition-colors font-semibold"
              >
                <LogOut size={16} />
                Keluar dari sistem
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowLogout(!showLogout)}
            className="w-full flex items-center gap-3 text-left hover:bg-white/60 p-2.5 -m-2.5 rounded-xl transition-all duration-200 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/50 text-amber-700 text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
              <p className="text-xs font-medium text-amber-600/80 mt-0.5">{roleLabel[role]}</p>
            </div>
            <div className="text-gray-400">
              {showLogout ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
