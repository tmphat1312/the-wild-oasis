import { format } from "date-fns";

type DatePresenterProps = {
  date: string | Date;
  formatString?: string;
};

export function DatePresenter({ date, formatString }: DatePresenterProps) {
  return <>{format(new Date(date), formatString || "MMM dd yyyy")}</>;
}
