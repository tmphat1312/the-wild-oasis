type DashboardBoxProps = {
  children: React.ReactNode;
};

export function DashboardBox({ children }: DashboardBoxProps) {
  return <div className="rounded-md border bg-background p-5">{children}</div>;
}
