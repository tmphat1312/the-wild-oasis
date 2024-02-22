import { Pencil, Trash } from "lucide-react";
import {
  DropZone,
  FileDropItem,
  FileTrigger,
  Button as RACButton,
} from "react-aria-components";

interface CabinImageUploadProps {
  onDeselectFile: () => void;
  onSelectFile: (file: File) => void;
  file: File | null;
  previewCabinImage: string | null;
  isImageRequired: boolean;
}

export function CabinImageUpload({
  file,
  previewCabinImage,
  isImageRequired,
  onSelectFile,
  onDeselectFile: handleDeselectFile,
}: CabinImageUploadProps) {
  function handleSelectFile(e: FileList | null) {
    if (e && e.length > 0) {
      onSelectFile(e[0]);
    }
  }

  return (
    <div className="group relative">
      <DropZone
        onDrop={(e) => {
          const files = e.items.filter(
            (file) => file.kind === "file",
          ) as FileDropItem[];

          if (files.length > 0) {
            files[0].getFile().then((file) => {
              onSelectFile(file);
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
              <RACButton aria-label="Change image" className="text-gray-900">
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

      {isImageRequired && (
        <p className="text-pretty py-2 text-center text-sm text-red-500">
          Cabin image is required
        </p>
      )}
    </div>
  );
}
