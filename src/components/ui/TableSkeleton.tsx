import { Skeleton } from "./Skeleton";

export default function TableSkeleton() {
  return (
    <div
      className="p-8 space-y-4 rounded bg-background"
      role="presentation"
      aria-label="Data table is loading"
      aria-live="polite"
    >
      <Skeleton className="w-full h-12" />
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-12 h-12" />
            <Skeleton className="w-1/2 h-12" />
            <Skeleton className="w-1/4 h-12" />
            <Skeleton className="w-1/4 h-12" />
            <Skeleton className="w-1/4 h-12" />
          </div>
        ))}
      </div>
      <Skeleton className="w-full h-12" />
    </div>
  );
}
