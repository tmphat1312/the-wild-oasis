import pluralize from "pluralize";
import { TableBody } from "react-aria-components";

import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import ErrorMessage from "@/components/ui/ErrorMessage";
import {
  Cell,
  Column,
  Row,
  ResizableTable,
  TableHeader,
} from "@/components/ui/Table";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { isLoading, error, data } = useCabins();

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="rounded-md bg-background shadow-sm">
      <ResizableTable aria-label="Cabin table">
        <TableHeader>
          {/* <Column isRowHeader>Showcase</Column> */}
          <Column isRowHeader>Cabin name</Column>
          <Column>Capacity</Column>
          <Column>Price</Column>
          <Column>Discount</Column>
        </TableHeader>
        <TableBody items={data}>
          {(row) => (
            <Row>
              <Cell>
                <div className="h-10">{row.name}</div>
              </Cell>
              <Cell>
                Fits up to {pluralize("guests", row.max_capacity, true)}
              </Cell>
              <Cell>
                <CurrencyPresenter amount={row.regular_price} />
              </Cell>
              <Cell>
                <CurrencyPresenter amount={row.discount} />
              </Cell>
            </Row>
          )}
        </TableBody>
      </ResizableTable>
    </div>
  );
}
