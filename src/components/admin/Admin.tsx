import AdminGraphics from './AdminGraphics'
import AdminMainStats from './AdminMainStats'
import AdminRanking from './AdminRanking'

const Admin = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center rounded-lg bg-gray text-center text-white">
      <div className="mt-6 flex w-full flex-col items-center justify-center gap-8 px-4 text-center sm:w-3/4 sm:px-0">
        <h1 className="text-4xl font-bold text-yellow">Admin</h1>
        <AdminMainStats />
        <AdminGraphics />
        <AdminRanking />
      </div>
    </div>
  )
}

export default Admin
