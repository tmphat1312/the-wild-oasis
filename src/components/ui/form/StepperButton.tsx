import { ButtonProps, Button } from "react-aria-components";

export function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="pressed:bg-gray-100 dark:pressed:bg-zinc-800 cursor-default px-0.5 text-gray-500 group-disabled:text-gray-200 dark:text-zinc-400 dark:group-disabled:text-zinc-600 forced-colors:group-disabled:text-[GrayText]"
    />
  );
}
