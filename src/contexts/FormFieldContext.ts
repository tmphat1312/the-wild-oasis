import { useContext, createContext } from "react";

const FormFieldContext = createContext({
  id: "",
  disabled: false,
});

export const FormFieldProvider = FormFieldContext.Provider;

export const useFormFieldContext = () => useContext(FormFieldContext);
