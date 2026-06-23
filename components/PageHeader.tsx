interface Props { title: string; subtitle?: string; breadcrumb?: string[]; action?: React.ReactNode }
export default function PageHeader({ title, subtitle, breadcrumb, action }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 md:mb-10">
      <div>
        {breadcrumb && (
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600/80 mb-2">{breadcrumb.join(' / ')}</p>
        )}
        <h1 className="page-title">{title}</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-3 mb-2 shadow-sm shadow-amber-400/20" />
        {subtitle && <p className="text-sm font-medium text-gray-500 mt-2">{subtitle}</p>}
      </div>
      {action && <div className="mt-2 md:mt-0">{action}</div>}
    </div>
  )
}

