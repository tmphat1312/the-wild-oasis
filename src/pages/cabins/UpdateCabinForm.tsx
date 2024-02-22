import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/form/ButtonGroup";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { Form } from "@/components/ui/form/Form";
import { NumberField } from "@/components/ui/form/NumberInput";
import { TextAreaField } from "@/components/ui/form/TextAreaField";
import { TextField } from "@/components/ui/form/TextField";
import { toast } from "@/lib/toast";
import { CabinValues, cabinSchema } from "@/schemas/cabinSchema";
import { CabinImageUpload } from "./CabinImageUpload";
import { useUpdateCabin } from "./useUpdateCabin";

interface CreateCabinFormProps {
  closeModal: () => void;
  cabin: CabinValues;
}

export function UpdateCabinForm({ closeModal, cabin }: CreateCabinFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewCabinImage, setPreviewCabinImage] = useState<string | null>(
    null,
  );
  const { isUpdating, updateCabinAsync } = useUpdateCabin();

  useEffect(() => {
    if (!file) {
      setPreviewCabinImage(cabin.image);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewCabinImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, cabin.image]);

  function handleSelectFile(file: File | null) {
    setFile(file);
  }

  function handleDeselectFile() {
    setFile(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newCabin = cabinSchema
      .omit({
        id: true,
      })
      .parse(data);

    toast.promise(
      updateCabinAsync(
        {
          newCabin: {
            ...newCabin,
            id: cabin.id,
            newImage: file,
          },
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      ),
      {
        loading: "Updating cabin...",
        success: "Cabin updated successfully",
        error: (error) => error.message || "Something went wrong",
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        aria-label="cabin image"
        type="hidden"
        name="image"
        value={cabin.image}
      />

      <div className="grid grid-cols-[192px_1fr] items-center gap-10">
        <CabinImageUpload
          previewCabinImage={previewCabinImage}
          isImageRequired={false}
          onSelectFile={handleSelectFile}
          onDeselectFile={handleDeselectFile}
        />
        <div>
          <TextField
            label="Cabin name"
            name="name"
            orientation="vertical"
            isRequired
            minLength={3}
            defaultValue={cabin.name}
          />
          <FieldSeparator />
          <TextAreaField
            name="description"
            orientation="vertical"
            label="Description for website"
            isRequired
            defaultValue={cabin.description}
          />
        </div>
      </div>
      <FieldSeparator />
      <NumberField
        name="max_capacity"
        label="Maximum capacity"
        isRequired
        minValue={1}
        defaultValue={cabin.max_capacity}
      />
      <FieldSeparator />
      <NumberField
        name="regular_price"
        label="Regular price"
        isRequired
        minValue={1}
        defaultValue={cabin.regular_price}
      />
      <FieldSeparator />
      <NumberField
        name="discount"
        label="Discount"
        defaultValue={cabin.discount}
      />
      <FieldSeparator />
      <ButtonGroup className="text-end">
        <Button
          variant="secondary"
          type="reset"
          onPress={closeModal}
          isDisabled={isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" isDisabled={isUpdating}>
          Save changes
        </Button>
      </ButtonGroup>
    </Form>
  );
}
