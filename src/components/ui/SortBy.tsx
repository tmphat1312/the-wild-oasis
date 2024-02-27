import { useSearchParams } from "react-router-dom";
import Select from "./form/Select";

type SortByProps = {
  options: { value: string; label: string }[];
};

export function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value == "") {
      searchParams.delete("sortBy");
    } else {
      searchParams.set("sortBy", e.target.value);
    }

    setSearchParams(searchParams);
  }

  return <Select options={options} value={sortBy} onChange={handleChange} />;
}
