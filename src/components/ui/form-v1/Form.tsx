import { FormProvider } from "@/contexts/FormContext";

type FormProps = React.ComponentProps<"form"> & {
  isSubmitting?: boolean;
};

export function Form({ isSubmitting = false, ...props }: FormProps) {
  return (
    <FormProvider
      value={{
        isSubmitting,
      }}
    >
      <form {...props} />
    </FormProvider>
  );
}
