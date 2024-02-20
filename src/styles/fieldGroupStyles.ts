import { focusRing } from "@/lib/utils";
import { fieldBorderStyles } from "@/styles/fieldBorderStyles";
import { tv } from "tailwind-variants";

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 bg-white dark:bg-zinc-900 forced-colors:bg-[Field] border-2 rounded-lg overflow-hidden",
  variants: fieldBorderStyles.variants,
});
