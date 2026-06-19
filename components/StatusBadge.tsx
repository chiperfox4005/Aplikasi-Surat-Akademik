const map: Record<string, string> = {
  BARU: 'bg-gray-100 text-gray-600',
  DIPERIKSA: 'bg-blue-50 text-blue-700',
  DIVERIFIKASI: 'bg-indigo-50 text-indigo-700',
  DIPROSES: 'bg-amber-50 text-amber-700',
  DITANDATANGANI: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  DITERIMA: 'bg-green-50 text-green-700',
  DIARSIPKAN: 'bg-slate-100 text-slate-600',
}
const label: Record<string, string> = {
  BARU: 'Baru', DIPERIKSA: 'Diperiksa', DIVERIFIKASI: 'Diverifikasi',
  DIPROSES: 'Diproses', DITANDATANGANI: 'Ditandatangani', DITERIMA: 'Diterima', DIARSIPKAN: 'Diarsipkan',
}
export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {label[status] ?? status}
    </span>
  )
}
