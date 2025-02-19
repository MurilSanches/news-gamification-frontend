import { useQuery } from '@tanstack/react-query'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { adminService } from 'services/admingService'

const AdminGraphics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['graphicsData'],
    queryFn: () => adminService.getGraphicData(),
    staleTime: 1000 * 60 * 5
  })

  if (isError) {
    return <div className="text-red">Erro ao carregar gráficos.</div>
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-8">
      <div className="flex w-[500px] flex-col gap-4">
        <h2 className="text-xl font-bold text-yellow">
          Acessos por Dia da Semana
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          {isLoading ? (
            <div className="size-full animate-pulse bg-gray"></div>
          ) : (
            <BarChart data={data?.weeklyData || []}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="access" fill="#fbbf24" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex w-[500px] flex-col gap-4">
        <h2 className="text-xl font-bold text-yellow">Acessos por Horário</h2>
        <ResponsiveContainer width="100%" height={300}>
          {isLoading ? (
            <div className="size-full animate-pulse bg-gray"></div>
          ) : (
            <LineChart data={data?.hourlyData || []}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="access"
                stroke="#fbbf24"
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminGraphics
