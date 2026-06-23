import { LucideIcon } from 'lucide-react'
interface Props { label: string; value: number | string; icon: LucideIcon; accent: string }
export default function StatCard({ label, value, icon: Icon, accent }: Props) {
  return (
    <div className={`card p-6 flex items-start justify-between border-t-4 border-t-transparent ${accent} hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-10 -mt-10 blur-2xl opacity-50 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        <p className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-2">{label}</p>
        <p className="text-4xl font-extrabold text-gray-900 bg-clip-text drop-shadow-sm">{value}</p>
      </div>
      <div className="relative z-10 p-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/80 text-amber-500/80 group-hover:text-amber-600 group-hover:scale-110 transition-all duration-300">
        <Icon size={28} strokeWidth={2.5} />
      </div>
    </div>
  )
}

