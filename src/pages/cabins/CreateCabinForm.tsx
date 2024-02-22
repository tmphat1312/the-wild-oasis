import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropZone,
  FileDropItem,
  FileTrigger,
  Button as RACButton,
} from "react-aria-components";

import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/form/ButtonGroup";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { Form } from "@/components/ui/form/Form";
import { NumberField } from "@/components/ui/form/NumberInput";
import { TextAreaField } from "@/components/ui/form/TextAreaField";
import { TextField } from "@/components/ui/form/TextField";
import { useCreateCabin } from "./useCreateCabin";

interface CreateCabinFormProps {
  closeModal: () => void;
}

export function CreateCabinForm({ closeModal }: CreateCabinFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewCabinImage, setPreviewCabinImage] = useState<string | null>(
    null,
  );
  const { isCreating, createCabinAsync } = useCreateCabin();

  useEffect(() => {
    if (!file) {
      setPreviewCabinImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewCabinImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleSelectFile(e: FileList | null) {
    const file = e ? e[0] : null;

    if (file) {
      setFile(file);
    }
  }

  function handleDeselectFile() {
    setFile(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    // const newSettings = settingSchema.parse(data);

    // toast.promise(updateSettingsAsync({ newSettings }), {
    //   loading: "Updating settings...",
    //   success: "Settings updated successfully",
    //   error: (error) => error.message || "Something went wrong",
    // });
  }

  return (
    <Form>
      <div className="grid grid-cols-[192px_1fr] items-center gap-10">
        <div className="group relative">
          <DropZone
            onDrop={(e) => {
              const files = e.items.filter(
                (file) => file.kind === "file",
              ) as FileDropItem[];

              if (files.length > 0) {
                files[0].getFile().then((file) => {
                  setFile(file);
                });
              }
            }}
            className="relative flex aspect-[1.5] w-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-2.5 data-[drop-target]:bg-brand-100"
          >
            {previewCabinImage ? (
              <img
                className="size-full object-contain"
                src={previewCabinImage}
                alt="Preview of the selected file"
              />
            ) : (
              <FileTrigger onSelect={handleSelectFile}>
                <div className="text-center text-sm text-gray-500">
                  <span>Drop your cabin image here or&nbsp;</span>
                  <RACButton className="text-brand-500">browse</RACButton>
                </div>
              </FileTrigger>
            )}
          </DropZone>

          {file && (
            <div className="absolute inset-0 hidden place-content-center gap-2 rounded-md bg-white/50 group-hover:grid">
              <div className="flex gap-3 rounded-md p-2 backdrop-blur-sm">
                <FileTrigger onSelect={handleSelectFile}>
                  <RACButton
                    aria-label="Change image"
                    className="text-gray-900"
                  >
                    <Pencil size={20} role="presentation" />
                  </RACButton>
                </FileTrigger>
                <RACButton
                  className="text-red-500"
                  aria-label="Discard the image"
                  onPress={handleDeselectFile}
                >
                  <Trash size={20} role="presentation" />
                </RACButton>
              </div>
            </div>
          )}
        </div>

        <div>
          <TextField
            label="Cabin name"
            orientation="vertical"
            isRequired
            minLength={3}
          />

          <FieldSeparator />

          <TextAreaField
            orientation="vertical"
            label="Description for website"
            isRequired
          />
        </div>
      </div>

      <FieldSeparator />

      <NumberField label="Maximum capacity" isRequired minValue={1} />

      <FieldSeparator />

      <NumberField label="Regular price" isRequired minValue={1} />

      <FieldSeparator />

      <NumberField label="Discount" />

      <FieldSeparator />

      <ButtonGroup className="text-end">
        <Button variant="secondary" type="reset" onPress={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </ButtonGroup>
    </Form>
  );
}
