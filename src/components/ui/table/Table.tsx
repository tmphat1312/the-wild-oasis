import { classnames } from "@/lib/classnames";

export function Table(props: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div className="box overflow-clip p-0">
      <table {...props} className={classnames("w-full", props.className)} />
    </div>
  );
}
