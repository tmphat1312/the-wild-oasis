import {
  TableBody as RACTableBody,
  TableBodyProps as RACTableBodyProps,
} from "react-aria-components";

export function TableBody<T extends object>(props: RACTableBodyProps<T>) {
  return <RACTableBody {...props} />;
}
