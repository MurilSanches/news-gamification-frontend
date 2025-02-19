import api from 'config/api'

const getStats = async () => {
  const { data } = await api.get('/admin/stats')
  return data
}

const getGraphicData = async () => {
  const { data } = await api.get('/admin/graphic')
  return data
}

const getRanking = async (
  type: string,
  order: string,
  start_date: string,
  end_date: string,
  page: number
) => {
  const { data } = await api.get('/admin/ranking', {
    params: { type, order, start_date, end_date, page, limit: 10 }
  })
  return data
}

export const adminService = {
  getStats,
  getGraphicData,
  getRanking
}
