import { Button } from "@/components/ui/Button";
import { TableRow } from "@/types/table-row";
import { HiTrash } from "react-icons/hi2";
import { useDeleteCabinById } from "./useDeleteCabinById";

import ConfirmAction from "@/components/ui/ConfirmAction";

interface CabinTableRowActionsProps {
  cabinId: TableRow<"cabins">["id"];
}

export default function CabinTableRowActions({
  cabinId,
}: CabinTableRowActionsProps) {
  const { isPending, mutate: deleteCabinById } = useDeleteCabinById();

  return (
    <ConfirmAction
      Opener={
        <Button
          disabled={isPending}
          variant="ghost"
          size="icon"
          className="text-destructive"
        >
          <HiTrash size={16} />
          <span className="sr-only">Delete this cabin</span>
        </Button>
      }
      title="Delete Cabin"
      description="Are you sure you want to delete this cabin? This action cannot be undone."
      onConfirm={() => deleteCabinById({ cabinId })}
    />
  );
}
