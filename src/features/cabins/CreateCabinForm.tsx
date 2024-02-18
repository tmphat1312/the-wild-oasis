import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { DialogClose } from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CabinFormValues, cabinFormSchema } from "@/schemas/CabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useRef } from "react";

const defaultValues: CabinFormValues = {
  // image: "",
  name: "",
  description: "",
  max_capacity: 10,
  regular_price: 10,
  discount: undefined,
};

export default function CreateCabinForm() {
  const { isPending, mutate: createCabin } = useCreateCabin();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(cabinFormSchema),
    defaultValues,
  });

  function onSubmit(values: CabinFormValues) {
    createCabin(
      { newCabin: values },
      {
        onSuccess: () => {
          closeBtnRef.current?.click();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          disabled={isPending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem isRequired={true}>
              <FormLabel>Name of the cabin</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="max_capacity"
          render={({ field }) => (
            <FormItem isRequired={true}>
              <FormLabel>Maximum capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="regular_price"
          render={({ field }) => (
            <FormItem isRequired={true}>
              <FormLabel>Regular price</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem isRequired={true}>
              <FormLabel>Description for website</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2 space-x-4 text-end">
          {/* <DialogClose asChild>
            <Button
              disabled={isPending}
              type="button"
              variant="secondary"
              ref={closeBtnRef}
            >
              Cancel
            </Button>
          </DialogClose> */}
          <Button disabled={isPending} type="submit">
            Create cabin
          </Button>
        </div>
      </form>
    </Form>
  );
}
