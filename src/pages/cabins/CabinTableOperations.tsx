import { SortBy } from "@/components/ui/SortBy";

export default function CabinTableOperations() {
  return (
    <div>
      <SortBy
        options={[
          { value: "", label: "Sort by default order" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price (low first)" },
          { value: "regular_price-desc", label: "Sort by price (high first)" },
          { value: "max_capacity-asc", label: "Sort by capacity (low first)" },
          {
            value: "max_capacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </div>
  );
}
