import { Dispatch, SetStateAction } from 'react'

interface AdminRankingFiltersProps {
  view: 'users' | 'newsletters'
  setView: Dispatch<SetStateAction<'users' | 'newsletters'>>
  order: 'asc' | 'desc'
  setOrder: Dispatch<SetStateAction<'asc' | 'desc'>>
  dateRange: { from: string; to: string }
  setDateRange: Dispatch<SetStateAction<{ from: string; to: string }>>
}

const AdminRankingFilters = ({
  view,
  setView,
  order,
  setOrder,
  dateRange,
  setDateRange
}: AdminRankingFiltersProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-4">
        <button
          className={`rounded border px-4 py-2 ${view === 'users' ? 'bg-gray' : ''}`}
          onClick={() => setView('users')}
        >
          Ranking de Usuários
        </button>
        <button
          className={`rounded border px-4 py-2 ${view === 'newsletters' ? 'bg-gray' : ''}`}
          onClick={() => setView('newsletters')}
        >
          Newsletters Mais Acessadas
        </button>
      </div>

      <div className="flex gap-4">
        <button
          className={`rounded border px-2 py-1 ${order === 'asc' ? 'bg-gray' : ''}`}
          onClick={() => setOrder('asc')}
        >
          Menor Primeiro
        </button>
        <button
          className={`rounded border px-2 py-1 ${order === 'desc' ? 'bg-gray' : ''}`}
          onClick={() => setOrder('desc')}
        >
          Maior Primeiro
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span>Período:</span>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, from: e.target.value }))
          }
          className="rounded border px-2 py-1 text-black"
        />
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, to: e.target.value }))
          }
          className="rounded border px-2 py-1 text-black"
        />
      </div>
    </div>
  )
}

export default AdminRankingFilters
