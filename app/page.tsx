import Link from "next/link"
import { ArrowRight, FileText, CheckCircle, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background blobs to enhance the glass effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 mt-12 mb-20 glass-panel p-12 md:p-20 rounded-3xl">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-sm border border-amber-200/50">
              <FileText className="w-14 h-14 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Sistem Informasi <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Surat Akademik</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Platform digital terpadu untuk pengajuan, verifikasi, dan penerbitan surat-surat akademik mahasiswa. Lebih cepat, transparan, dan mudah dilacak.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-600/30 hover:shadow-2xl hover:shadow-amber-600/40 hover:-translate-y-1"
            >
              Masuk ke Sistem
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-14 h-14 bg-white/80 backdrop-blur-sm shadow-sm border border-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Tracking</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Pantau status pengajuan surat Anda secara real-time dari awal hingga selesai ditandatangani.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-14 h-14 bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Verifikasi Digital</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Proses verifikasi berjenjang oleh Admin, Prodi, dan Pimpinan terintegrasi dalam satu platform.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-14 h-14 bg-white/80 backdrop-blur-sm shadow-sm border border-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Arsip Terpusat</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Seluruh surat yang telah selesai akan diarsipkan secara digital dan dapat diunduh kapan saja.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
