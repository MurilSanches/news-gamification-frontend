import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Admin from './admin/Admin'
import Streak from './streak-checker/Streak'
import StreakLogin from './streak-checker/StreakLogin'
import StreakCreateName from './streak-checker/StreakCreateName'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StreakLogin />} />
          <Route path="/user/:id" element={<Streak />} />
          <Route path="/create-user/:id" element={<StreakCreateName />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<StreakLogin />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
