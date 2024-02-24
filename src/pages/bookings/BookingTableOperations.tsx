import { Filter } from "@/components/ui/Filter";
import { SortBy } from "@/components/ui/SortBy";

export function BookingTableOperations() {
  return (
    <div className="flex justify-end gap-4">
      <Filter
        filterField="status"
        options={[
          { value: "", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
    </div>
  );
}
