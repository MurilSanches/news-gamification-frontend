import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { adminService } from 'services/admingService'
import AdminRankingFilters from './AdminRankingFilters'

const AdminRanking = () => {
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: ''
  })

  const [view, setView] = useState<'users' | 'newsletters'>('users')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ranking', view, order, dateRange.from, dateRange.to, page],
    queryFn: () =>
      adminService.getRanking(view, order, dateRange.from, dateRange.to, page),
    staleTime: 1000 * 60 * 5
  })

  if (isError) {
    return <div className="text-red">Erro ao carregar ranking.</div>
  }

  return (
    <div className="flex w-full flex-wrap">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-bold text-yellow">Ranking</h2>
        <AdminRankingFilters
          view={view}
          setView={setView}
          order={order}
          setOrder={setOrder}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <div className="flex flex-col gap-4 border-t border-brown pt-4">
          {isLoading ? (
            <div className="h-24 w-full animate-pulse bg-gray"></div>
          ) : (
            data?.data.map((item: any, index: number) => (
              <div
                key={item.id || item.newsletter_id}
                className="border-b border-brown pb-4"
              >
                {view === 'users' ? (
                  <span>
                    {index + 1} - {item.name || 'Usuário'} - {item.streak}{' '}
                    Streak
                  </span>
                ) : (
                  <span>
                    {index + 1} - Newsletter {item.newsletter_id} - {item.views}{' '}
                    visualizações
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            className="rounded border px-4 py-2 disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </button>
          <span>
            Página {page} de {data?.pagination.total_pages || 1}
          </span>
          <button
            className="rounded border px-4 py-2 disabled:opacity-40"
            disabled={page >= (data?.pagination.total_pages || 1)}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminRanking
