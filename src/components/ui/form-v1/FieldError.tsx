import { useFormFieldContext } from "@/contexts/FormFieldContext";

type FieldErrorProps = React.PropsWithChildren;

export function FieldError({ children }: FieldErrorProps) {
  const { id } = useFormFieldContext();

  return (
    <p
      id={`${id}-error`}
      role="alert"
      aria-live="polite"
      className="text-sm text-destructive first-letter:uppercase"
    >
      {children}
    </p>
  );
}
