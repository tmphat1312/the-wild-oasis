import { Skeleton } from "./Skeleton";

export default function FormSkeleton() {
  return (
    <div role="presentation" aria-label="Content is loading" aria-live="polite">
      <div className="animate-pulse space-y-6 rounded-md bg-background p-8 shadow-sm">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className="grid grid-cols-[16ch_28ch_1fr] items-center gap-4"
            key={i}
          >
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ))}

        <div className="space-x-4 text-end">
          <Skeleton className="inline-block h-12 w-32" />
          <Skeleton className="inline-block h-12 w-32" />
        </div>
      </div>
    </div>
  );
}
