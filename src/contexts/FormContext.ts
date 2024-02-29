import { useContext, createContext } from "react";

const FormContext = createContext({
  isSubmitting: false,
});

export const FormProvider = FormContext.Provider;

export const useFormContext = () => useContext(FormContext);
