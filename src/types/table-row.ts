import { Database } from "./database";

export type TableRowNames = keyof Database["public"]["Tables"];

export type TableRow<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Row"];

export type TableRowInsert<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Insert"];

export type TableRowUpdate<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Update"];
