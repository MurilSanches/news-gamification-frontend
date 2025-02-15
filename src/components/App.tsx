import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StreakChecker from './streak-checker/StreakChecker'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StreakChecker />
    </QueryClientProvider>
  )
}

export default App
