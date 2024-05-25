import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm h-[46px] bg-neutral-100", className)}
      {...props}
    />
  )
}

export { Skeleton }
