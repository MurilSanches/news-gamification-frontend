interface AdminMainStatsItemProps {
  title: string
  isLoading: boolean
  value?: number
}

const AdminMainStatsItem = ({
  title,
  isLoading,
  value = 0
}: AdminMainStatsItemProps) => {
  return (
    <div className="flex min-w-[250px] flex-col items-center justify-center gap-4 rounded-md bg-brown p-8">
      {title}
      {isLoading ? (
        <div className="size-10 animate-pulse rounded-full bg-gray"></div>
      ) : (
        <div className="flex size-10 items-center justify-center rounded-full bg-yellow text-center font-bold text-gray">
          {value}
        </div>
      )}
    </div>
  )
}

export default AdminMainStatsItem
