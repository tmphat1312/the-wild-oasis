import {
  TableHeader as RACTableHeader,
  TableHeaderProps,
} from "react-aria-components";

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <RACTableHeader {...props} />;
}
