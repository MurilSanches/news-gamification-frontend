import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { streakService } from 'services/streakService'
import { emailSchema } from 'validation/emailSchema'

const useStreakLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getStreak = (email: string) => {
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setError('E-mail inválido')
      return
    }

    setLoading(true)
    setError(null)
    streakService
      .getUser(email)
      .then((streak) => {
        if (streak.name) {
          navigate(`/user/${streak.id}`)
          return
        }
        navigate(`/create-user/${streak.id}`)
      })
      .catch((error) => {
        setError(error.response.data.message)
        setEmail('')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    getStreak,
    loading,
    error,
    email,
    setEmail
  }
}

export default useStreakLogin
