import { Skeleton } from "./Skeleton";

export default function FormSkeleton() {
  return (
    <div role="presentation" aria-label="Content is loading" aria-live="polite">
      <div className="p-8 space-y-6 rounded-md shadow-sm bg-background animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex flex-col space-y-2" key={i}>
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="h-10" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        ))}

        <div className="space-x-4 text-end">
          <Skeleton className="inline-block w-32 h-10" />
          <Skeleton className="inline-block w-32 h-10" />
        </div>
      </div>
    </div>
  );
}
