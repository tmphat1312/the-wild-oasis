import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/form/ButtonGroup";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { Form } from "@/components/ui/form/Form";
import { NumberField } from "@/components/ui/form/NumberInput";
import { TextAreaField } from "@/components/ui/form/TextAreaField";
import { TextField } from "@/components/ui/form/TextField";
import { CabinSchema } from "@/schemas/CabinSchema";
import { CabinImageUpload } from "./CabinImageUpload";
import { useCreateCabin } from "./useCreateCabin";

type CreateCabinFormProps = {
  closeModal: () => void;
};

export function CreateCabinForm({ closeModal }: CreateCabinFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewCabinImage, setPreviewCabinImage] = useState<string | null>(
    null,
  );
  const [isImageRequired, setIsImageRequired] = useState(false);
  const { isCreating, createCabin } = useCreateCabin();

  useEffect(() => {
    if (!file) {
      setPreviewCabinImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewCabinImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleSelectFile(file: File | null) {
    setFile(file);
    setIsImageRequired(false);
  }

  function handleDeselectFile() {
    setFile(null);
  }

  function handleCheckImagePresence() {
    if (!previewCabinImage) {
      setIsImageRequired(true);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!previewCabinImage || !file) {
      setIsImageRequired(true);
      return;
    }

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newCabin = CabinSchema.omit({
      id: true,
    }).parse(data);

    createCabin(
      {
        newCabin: {
          ...newCabin,
          image: file,
        },
      },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        aria-label="cabin image"
        type="hidden"
        name="image"
        value={previewCabinImage || ""}
      />

      <div className="grid grid-cols-[192px_1fr] items-center gap-10">
        <CabinImageUpload
          previewCabinImage={previewCabinImage}
          isImageRequired={isImageRequired}
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
          />
          <FieldSeparator />
          <TextAreaField
            name="description"
            orientation="vertical"
            label="Description for website"
            isRequired
          />
        </div>
      </div>
      <FieldSeparator />
      <NumberField
        name="max_capacity"
        label="Maximum capacity"
        isRequired
        minValue={1}
      />
      <FieldSeparator />
      <NumberField
        name="regular_price"
        label="Regular price"
        isRequired
        minValue={1}
      />
      <FieldSeparator />
      <NumberField name="discount" label="Discount" />
      <FieldSeparator />
      <ButtonGroup className="text-end">
        <Button
          variant="secondary"
          type="reset"
          onPress={closeModal}
          isDisabled={isCreating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onPress={handleCheckImagePresence}
          isDisabled={isCreating}
        >
          Submit
        </Button>
      </ButtonGroup>
    </Form>
  );
}
