import Input from 'components/input/input'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { streakService } from 'services/streakService'

const StreakCreateName = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const save = () => {
    if (id) {
      setLoading(true)
      streakService
        .setUserName(id, name)
        .then(() => {
          navigate(`/user/${id}`)
        })
        .catch((error) => console.error('Error', error))
        .finally(() => setLoading(false))
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center rounded-lg bg-gray text-center text-white">
      <div className="mt-6 flex w-3/4 flex-col items-center justify-center gap-4 text-center">
        <button
          onClick={() => navigate('/')}
          className="self-start rounded border border-yellow px-4 py-2 font-bold text-yellow hover:opacity-60"
        >
          Voltar
        </button>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold text-yellow">
            Olá, vimos que você ainda não tem nome cadastrado ainda
          </h1>
          <span className="text-xl">Gostaria de adicionar?</span>
          <div>
            <Input
              type="email"
              placeholder="Digite seu nome"
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              className="w-80 rounded-md border-2 border-yellow bg-white p-2 text-black focus:outline-none"
            />
          </div>
          <button
            onClick={() => save()}
            disabled={loading}
            className="mt-4 rounded-md bg-yellow p-2 font-bold text-brown hover:border hover:border-yellow hover:bg-gray hover:text-yellow "
          >
            {loading ? 'Adicioando' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StreakCreateName
