import { classnames } from "@/lib/classnames";

type SelectProps = React.ComponentPropsWithRef<"select"> & {
  options: { value: string; label: string }[];
};

export function Select({ options, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={classnames(
        "rounded-md border px-3 py-2 text-sm font-medium shadow",
        props.className,
      )}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
