import { Filter } from "@/components/ui/Filter";
import { SortBy } from "@/components/ui/SortBy";
import { CreateCabin } from "./CreateCabin";

export default function CabinTableOperations() {
  return (
    <div className="flex gap-4">
      <Filter
        filterField="discount"
        options={[
          { value: "", label: "All" },
          { value: "without_discount", label: "Without discount" },
          { value: "with_discount", label: "With discount" },
        ]}
      />

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

      <CreateCabin />
    </div>
  );
}
