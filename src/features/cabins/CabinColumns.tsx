import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import { TableRow } from "@/types/table-row";
import { ColumnDef } from "@tanstack/react-table";
import pluralize from "pluralize";
import { z } from "zod";
import HeaderColumn from "./CabinTableHeaderColumn";
import CabinTableRowActions from "./CabinTableRowActions";

type Cabin = TableRow<"cabins">;

export const columns: ColumnDef<Cabin>[] = [
  {
    accessorKey: "image",
    header: () => <HeaderColumn>Showcase</HeaderColumn>,
    enableResizing: true,
    cell: ({ row }) => {
      const { image, name } = z
        .object({
          image: z.string(),
          name: z.string(),
        })
        .parse(row.original);

      return (
        <img
          src={image}
          alt={"showcase of cabin " + name}
          className="w-[120px] bg-muted rounded"
          width={120}
          loading="eager"
          decoding="async"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <HeaderColumn>Cabin</HeaderColumn>,
    cell: (props) => {
      const cabinName = z.string().parse(props.getValue());

      return <div className="font-medium">{cabinName}</div>;
    },
  },
  {
    accessorKey: "max_capacity",
    header: () => <HeaderColumn>Capacity</HeaderColumn>,
    cell: (props) => {
      const capacity = z.number().parse(props.getValue());

      return (
        <div>
          Fits up to {capacity} {pluralize("guest", capacity)}
        </div>
      );
    },
  },
  {
    accessorKey: "regular_price",
    header: () => <HeaderColumn>Price</HeaderColumn>,
    cell: (props) => {
      const price = z.number().parse(props.getValue());

      return (
        <div className="font-medium tracking-wide">
          <CurrencyPresenter amount={price} />
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: () => <HeaderColumn>Discount</HeaderColumn>,
    cell: (props) => {
      const discount = z.number().nullable().parse(props.getValue());

      return (
        <div className="font-medium text-foreground/70">
          {discount ? (
            <CurrencyPresenter amount={discount} />
          ) : (
            <span aria-label="no discount on this product" role="presentation">
              __
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cabinId = row.original.id;
      return <CabinTableRowActions cabinId={cabinId} />;
    },
  },
];
