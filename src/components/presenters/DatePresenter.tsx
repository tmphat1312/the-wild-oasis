import { format } from "date-fns";

interface DatePresenterProps {
  date: string | Date;
}

export function DatePresenter({ date }: DatePresenterProps) {
  return <>{format(new Date(date), "MMM dd yyyy")}</>;
}
