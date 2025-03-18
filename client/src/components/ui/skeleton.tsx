import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80 relative overflow-hidden",
        "after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

// Specialized skeletons for our use cases
function StatsSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex gap-4 py-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 flex-1" />
      <Skeleton className="h-6 w-32" />
    </div>
  )
}

export { Skeleton, StatsSkeleton, ChartSkeleton, TableRowSkeleton }