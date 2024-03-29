import { Filter } from "@/components/ui/Filter";

export function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      defaultValue="7"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
    />
  );
}
