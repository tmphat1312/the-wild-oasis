import ErrorMessage from "@/components/ui/ErrorMessage";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { columns } from "./CabinColumns";
import { DataTable } from "./DataTable";
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
    <div className="rounded-md shadow-sm bg-background">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
