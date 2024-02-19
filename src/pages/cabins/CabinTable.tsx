import ErrorMessage from "@/components/ui/ErrorMessage";
import TableSkeleton from "@/components/ui/TableSkeleton";

import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { isLoading, error, data } = useCabins();

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="rounded-md bg-background shadow-sm">{data?.length}</div>
  );
}
