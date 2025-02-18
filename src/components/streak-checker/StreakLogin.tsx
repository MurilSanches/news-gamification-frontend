import Input from 'components/input/input'

import useStreakLogin from 'hook/useStreakLogin'

const StreakLogin = () => {
  const { getStreak, loading, error, email, setEmail } = useStreakLogin()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray text-white">
      <h1 className="mb-4 text-2xl font-bold text-yellow">Login</h1>
      <span className="text-lg font-normal ">Digite seu email abaixo: :)</span>
      <div className="w-80">
        <Input
          type="email"
          placeholder="example@example.com"
          value={email}
          error={!!error}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="mt-2 font-bold text-brown">{error}</p>}
      </div>
      <button
        onClick={() => getStreak(email)}
        disabled={loading}
        className="mt-4 rounded-md bg-yellow p-2 font-bold text-black hover:border hover:border-yellow hover:bg-gray hover:text-yellow "
      >
        Verificar
      </button>
    </div>
  )
}

export default StreakLogin
