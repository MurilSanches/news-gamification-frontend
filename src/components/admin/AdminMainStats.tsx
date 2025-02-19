import { useQuery } from '@tanstack/react-query'
import AdminMainStatsItem from './AdminMainStatsItem'
import { adminService } from 'services/admingService'

const AdminMainStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminService.getStats(),
    staleTime: 1000 * 60 * 5
  })

  if (isError) {
    return <div className="text-red">Erro ao carregar estatísticas.</div>
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <AdminMainStatsItem
        title="Qtd. de usuários"
        isLoading={isLoading}
        value={data?.total_users ?? 0}
      />

      <AdminMainStatsItem
        title="Maior Streak"
        isLoading={isLoading}
        value={data?.max_streak_user?.streak ?? 0}
      />

      <AdminMainStatsItem
        title="Notícia mais vista"
        isLoading={isLoading}
        value={data?.most_viewed_newsletter?.newsletter_id ?? 'N/A'}
      />
    </div>
  )
}

export default AdminMainStats
