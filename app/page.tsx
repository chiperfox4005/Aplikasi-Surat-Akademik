import Link from "next/link"
import { ArrowRight, FileText, CheckCircle, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 mt-12 mb-20">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl shadow-sm">
              <FileText className="w-12 h-12 text-amber-600 dark:text-amber-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Sistem Informasi <br/>
            <span className="text-amber-600 dark:text-amber-500">Surat Akademik</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            Platform digital terpadu untuk pengajuan, verifikasi, dan penerbitan surat-surat akademik mahasiswa. Lebih cepat, transparan, dan mudah dilacak.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Masuk ke Sistem
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Real-time Tracking</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Pantau status pengajuan surat Anda secara real-time dari awal hingga selesai ditandatangani.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Verifikasi Digital</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Proses verifikasi berjenjang oleh Admin, Prodi, dan Pimpinan terintegrasi dalam satu platform.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Arsip Terpusat</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Seluruh surat yang telah selesai akan diarsipkan secara digital dan dapat diunduh kapan saja.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
