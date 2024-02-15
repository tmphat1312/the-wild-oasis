import { Database } from "./database";

export type TableRowNames = keyof Database["public"]["Tables"];

export type TableRow<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Row"];
