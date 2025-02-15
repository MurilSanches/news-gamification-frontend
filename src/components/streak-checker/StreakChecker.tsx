import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Streak } from 'type/streak'
import api from 'config/api'

export default function StreakChecker() {
  const [email, setEmail] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState<string>('')

  const fetchStreak = async (email: string) => {
    const { data } = await api.get<Streak>(`/user/${email}`)
    return data
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['streak', submittedEmail],
    queryFn: () => fetchStreak(submittedEmail),
    enabled: !!submittedEmail
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <h1 className="mb-4 text-2xl font-bold text-yellow">Verificar Streak</h1>
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 rounded-md border border-gray p-2 text-black"
      />
      <button
        onClick={() => setSubmittedEmail(email)}
        className="mt-4 rounded-md bg-yellow p-2 font-bold text-black hover:bg-gray"
      >
        Verificar
      </button>

      {isLoading && <p className="mt-4 text-gray">Carregando...</p>}
      {isError && <p className="text-red-500 mt-4">Erro ao buscar streak.</p>}
      {data && (
        <div className="mt-6 w-80 rounded-lg bg-brown p-4 text-center">
          <p className="text-xl font-semibold">Email: {data.email}</p>
          <p className="text-lg">
            Streak Atual:{' '}
            <span className="font-bold text-yellow">{data.streak}</span>
          </p>
          <p className="mt-2 text-sm text-gray">Últimas leituras:</p>
          <ul className="text-sm">
            {data.history.map((date, index) => (
              <li key={index} className="text-white">
                {new Date(date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
