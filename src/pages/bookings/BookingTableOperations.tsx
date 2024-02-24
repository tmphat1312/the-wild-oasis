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

      <SortBy
        options={[
          { value: "", label: "Sort by default order" },
          { value: "start_date-desc", label: "Sort by date (recent first)" },
          { value: "start_date-asc", label: "Sort by date (earlier first)" },
          {
            value: "total_due-desc",
            label: "Sort by amount (high first)",
          },
          { value: "total_due-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </div>
  );
}
