import { LucideIcon } from 'lucide-react'
interface Props { label: string; value: number | string; icon: LucideIcon; accent: string }
export default function StatCard({ label, value, icon: Icon, accent }: Props) {
  return (
    <div className={`card p-5 flex items-start justify-between border-l-4 ${accent}`}>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon className="text-gray-200 mt-1" size={36} />
    </div>
  )
}
