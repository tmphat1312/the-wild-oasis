import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="box">
          <Skeleton className="h-20" />
        </div>
        <div className="box">
          <Skeleton className="h-20" />
        </div>
        <div className="box">
          <Skeleton className="h-20" />
        </div>
        <div className="box">
          <Skeleton className="h-20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="box">
          <Skeleton className="h-60" />
        </div>
        <div className="box">
          <Skeleton className="h-60" />
        </div>
      </div>

      <div className="box">
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}
