import { CurrencyPresenter } from "@/components/presenters/CurrencyPresenter";
import { Cell } from "@/components/ui/table/Cell";
import { Row } from "@/components/ui/table/Row";
import { CabinValues } from "@/schemas/cabinSchema";
import pluralize from "pluralize";
import { CabinTableRowActions } from "./CabinTableRowActions";

type CabinTableRowProps = {
  row: CabinValues;
};

export function CabinTableRow({ row }: CabinTableRowProps) {
  return (
    <Row className="text-sm">
      <Cell>
        <img
          src={row.image}
          className="max-h-14 bg-brand-100"
          width={88}
          height={56}
        />
      </Cell>
      <Cell className="font-display text-base font-medium">{row.name}</Cell>
      <Cell>Fits up to {pluralize("guests", row.max_capacity, true)}</Cell>
      <Cell className="font-display font-medium">
        <CurrencyPresenter amount={row.regular_price} />
      </Cell>
      <Cell className="font-display text-green-700">
        <CurrencyPresenter amount={row.discount} />
      </Cell>
      <Cell>
        <CabinTableRowActions cabin={row} />
      </Cell>
    </Row>
  );
}
