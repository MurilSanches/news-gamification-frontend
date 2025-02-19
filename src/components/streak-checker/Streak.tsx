import { useEffect, useState } from 'react'

import Fire from 'assets/fire.png'
import { motivationalMessages } from 'data/motivational-messages'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { streakService } from 'services/streakService'

export default function Streak() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [motivationalMessage, setMotivationalMessage] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['streak'],
    queryFn: () => streakService.getStreak(id as string)
  })

  useEffect(() => {
    const getMotivationalMessage = () => {
      const randomIndex = Math.floor(Math.random() * 5)
      return motivationalMessages[randomIndex]
    }

    setMotivationalMessage(getMotivationalMessage())
  }, [])

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full flex-col items-center rounded-lg bg-gray text-center text-white">
        <div className="mt-6 flex w-3/4 flex-col items-center justify-center gap-4 text-center">
          <p>Carregando...</p>
        </div>
      </div>
    )

  if (isError || !data) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center rounded-lg bg-gray text-center text-white">
        <div className="mt-6 flex w-3/4 flex-col items-center justify-center gap-4 text-center">
          <p>Ops, algo deu errado.</p>
          <button
            onClick={() => refetch()}
            className="self-start rounded border border-yellow px-4 py-2 font-bold text-yellow hover:opacity-60"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center rounded-lg bg-gray text-center text-white">
      <div className="mt-6 flex w-3/4 flex-col items-center justify-center gap-4 text-center">
        <button
          onClick={() => navigate('/')}
          className="self-start rounded border border-yellow px-4 py-2 font-bold text-yellow hover:opacity-60"
        >
          Voltar
        </button>

        <div className="relative flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="relative flex items-center justify-center gap-2 sm:absolute sm:bottom-0 sm:right-0">
            <img src={Fire} alt="fogo" className="w-20" />
            <p className="absolute bottom-1 text-2xl font-bold text-white">
              {data.streak}
            </p>
          </div>
          <h2 className="text-4xl font-bold text-yellow">Olá, {data.name}</h2>
        </div>

        <p className="mt-16 text-lg font-bold">
          Você está há {data.streak} dias utilizando nosso sistema! 🎉
        </p>

        <p className="mt-2 text-lg italic">{motivationalMessage}</p>

        <p className="mt-4 self-start text-lg font-semibold text-brown">
          Últimos acessos:
        </p>

        <div className="mt-2 w-full rounded-md bg-gray py-2">
          <ul className="text-sm text-white">
            {data.history.map((date, index) => (
              <li key={index} className="border-b border-yellow py-4">
                {index + 1} - {new Date(date).toLocaleDateString()}
              </li>
            ))}
          </ul>
          <button className="mt-2 text-yellow hover:underline">
            Mostrar mais
          </button>
        </div>
      </div>
    </div>
  )
}
