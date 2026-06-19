import { FileX } from 'lucide-react'
export default function EmptyState({ title = 'Belum ada data', desc = '' }: { title?: string; desc?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileX size={40} className="text-gray-200 mb-3" />
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {desc && <p className="text-xs text-gray-400 mt-1">{desc}</p>}
    </div>
  )
}
