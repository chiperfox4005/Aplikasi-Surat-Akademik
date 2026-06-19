const steps = ['BARU','DIPERIKSA','DIVERIFIKASI','DIPROSES','DITANDATANGANI','DITERIMA','DIARSIPKAN']
const labels = ['Baru','Diperiksa','Diverifikasi','Diproses','Ditandatangani','Diterima','Diarsipkan']
export default function TimelineStatus({ current }: { current: string }) {
  const idx = steps.indexOf(current)
  return (
    <div className="flex items-center w-full overflow-x-auto py-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all
              ${i < idx ? 'bg-amber-500 border-amber-500 text-white'
              : i === idx ? 'bg-amber-500 border-amber-500 text-white ring-4 ring-amber-100'
              : 'bg-white border-gray-200 text-gray-400'}`}>
              {i < idx ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 whitespace-nowrap ${i <= idx ? 'text-amber-700 font-medium' : 'text-gray-400'}`}>
              {labels[i]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 ${i < idx ? 'bg-amber-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
