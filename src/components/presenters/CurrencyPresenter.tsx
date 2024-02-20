type CurrencyPresenterProps = {
  amount: number | bigint;
};

export default function CurrencyPresenter({ amount }: CurrencyPresenterProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return <>{formatter.format(amount)}</>;
}
