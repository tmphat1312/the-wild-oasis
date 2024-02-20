import { Skeleton } from "./Skeleton";

export default function FormSkeleton() {
  return (
    <div
      role="presentation"
      aria-label="Content is loading"
      aria-live="polite"
      className="max-w-prose"
    >
      <div className="animate-pulse space-y-6 rounded-md bg-background p-8 shadow-sm">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex flex-col space-y-2" key={i}>
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}

        <div className="space-x-4 text-end">
          <Skeleton className="inline-block h-10 w-32" />
          <Skeleton className="inline-block h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
