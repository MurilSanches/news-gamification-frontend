import api from 'config/api'
import { Streak } from 'types/streak'

const getUser = async (email: string) => {
  const { data } = await api.get<Streak>(`/user/${email}`)
  return data
}

const getStreak = async (id: string) => {
  const { data } = await api.get<Streak>(`/user/streak/${id}`)
  return data
}

const setUserName = (id: string, name: string) =>
  api.put(`/user/${id}/name`, { name })

export const streakService = {
  getUser,
  getStreak,
  setUserName
}
