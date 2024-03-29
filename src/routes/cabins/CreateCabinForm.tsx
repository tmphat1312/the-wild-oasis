import { Button } from "@/components/ui/Button";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { TextArea } from "@/components/ui/form/TextArea";
import { TextAreaField } from "@/components/ui/form/TextAreaField";
import { Label } from "@/components/ui/form/Label";
import { CabinType } from "@/schemas/CabinSchema";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";

type Props = {
  closeModal: () => void;
};

type Type = CabinType & {
  newImage: FileList;
};

export function CreateCabinForm({ closeModal }: Props) {
  const { isCreating, createCabin } = useCreateCabin();
  const form = useForm<Type>();

  function onSubmit(data: Type) {
    createCabin({ newCabin: data }, { onSuccess: closeModal });
  }

  const errors = form.formState.errors;

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} isSubmitting={isCreating}>
      <FormField>
        <Label>Cabin name</Label>
        <Input
          {...form.register("name", {
            required: "Cabin name is required",
            minLength: {
              value: 3,
              message: "Cabin name must be at least 3 characters long",
            },
          })}
        />
        <FieldError>{errors.name?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Maximum capacity</Label>
        <Input
          {...form.register("max_capacity", {
            valueAsNumber: true,
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1",
            },
            validate: (value) => value % 1 === 0 || "Must be an integer",
          })}
          type="number"
        />
        <FieldError>{errors.max_capacity?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Regular price</Label>
        <Input
          {...form.register("regular_price", {
            valueAsNumber: true,
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Regular price must be at least 1",
            },
          })}
        />
        <FieldError>{errors.regular_price?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Discount</Label>
        <Input
          {...form.register("discount", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Discount must be at least 0",
            },
          })}
          type="number"
        />
        <FieldError>{errors.discount?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Cabin image</Label>
        <Input
          type="file"
          {...form.register("newImage", {
            required: "Cabin image is required",
          })}
        />
        <FieldError>{errors.newImage?.message}</FieldError>
      </FormField>
      <TextAreaField>
        <Label>Description for website</Label>
        <TextArea
          {...form.register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
          })}
        />
        <FieldError>{errors.description?.message}</FieldError>
      </TextAreaField>

      <ButtonField>
        <Button variant="secondary" type="reset" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </ButtonField>
    </Form>
  );
}
