import { formatDistance } from "date-fns";

interface DateDistancePresenterProps {
  date: string | Date;
}

export function DateDistancePresenter({ date }: DateDistancePresenterProps) {
  return <>{formatDistance(new Date(date), new Date(), { addSuffix: true })}</>;
}
