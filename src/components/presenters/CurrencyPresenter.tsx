type CurrencyPresenterProps = {
  amount: number | bigint;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CurrencyPresenter({ amount }: CurrencyPresenterProps) {
  return <>{formatter.format(amount)}</>;
}
