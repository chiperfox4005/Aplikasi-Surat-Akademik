interface Props { title: string; subtitle?: string; breadcrumb?: string[]; action?: React.ReactNode }
export default function PageHeader({ title, subtitle, breadcrumb, action }: Props) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {breadcrumb && (
          <p className="text-xs text-gray-400 mb-1">{breadcrumb.join(' / ')}</p>
        )}
        <h1 className="page-title">{title}</h1>
        <div className="w-10 h-0.5 bg-amber-400 mt-1.5 mb-1" />
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
