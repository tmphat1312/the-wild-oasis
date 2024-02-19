import { Skeleton } from "./Skeleton";

export default function TableSkeleton() {
  return (
    <div
      className="space-y-4 rounded bg-background p-8"
      role="presentation"
      aria-label="Data table is loading"
      aria-live="polite"
    >
      <Skeleton className="h-12 w-full" />
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-12 w-1/4" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
