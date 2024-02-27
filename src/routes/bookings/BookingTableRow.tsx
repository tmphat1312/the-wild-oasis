import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import { DateDistancePresenter } from "@/components/presenters/DateDistancePresenter";
import { DatePresenter } from "@/components/presenters/DatePresenter";
import { Tag, TagColor } from "@/components/ui/Tag";
import { Cell } from "@/components/ui/table/Cell";
import { Row } from "@/components/ui/table/Row";
import { BookingStatus, BookingValues } from "@/schemas/bookingSchema";
import pluralize from "pluralize";
import { BookingRowActions } from "./BookingRowActions";

interface BookingTableRowProps {
  row: BookingValues;
}

const tagColors: Record<BookingStatus, TagColor> = {
  unconfirmed: "muted",
  "checked in": "success",
  "checked out": "info",
} as const;

export function BookingTableRow({ row }: BookingTableRowProps) {
  const statusColor = tagColors[row.status];

  return (
    <Row className="text-sm">
      <Cell className="font-display py-3 text-base font-medium">
        {row.cabins.name}
      </Cell>
      <Cell className="py-3">
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">{row.guests.full_name}</span>
          <span className="text-xs">{row.guests.email}</span>
        </div>
      </Cell>
      <Cell className="py-3">
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">
            {pluralize("night", row.no_nights, true)} stay
            <> - </>
            <DateDistancePresenter date={row.start_date} />
          </span>
          <span className="text-xs">
            <DatePresenter date={row.start_date} />
            <> &rarr; </>
            <DatePresenter date={row.start_date} />
          </span>
        </div>
      </Cell>
      <Cell className="font-display py-3">
        <Tag color={statusColor}>{row.status}</Tag>
      </Cell>
      <Cell className="font-display py-3 font-medium">
        <CurrencyPresenter amount={row.total_due} />
      </Cell>
      <Cell>
        <BookingRowActions booking={row} />
      </Cell>
    </Row>
  );
}
