import { CabinValues, cabinsSchema } from "@/schemas/cabinSchema";
import { TablesInsert } from "@/types/database";
import { BuildAPIClient, BuildStorageAPIClient } from "./APIClient";
import { supabaseStorageDataSchema } from "@/schemas/supabaseStorageDataSchema";

export async function getCabins() {
  const { data } = await BuildAPIClient("cabins").select("*").throwOnError();

  return cabinsSchema.parse(data);
}

type DeleteCabinArgs = {
  cabinId: CabinValues["id"];
  cabinImage: CabinValues["image"];
};
export async function deleteCabinById({
  cabinId,
  cabinImage,
}: DeleteCabinArgs) {
  const storageClient = BuildStorageAPIClient().from("cabin_showcases");
  const oldImage = cabinImage.split("/").pop();

  if (oldImage) {
    const { error: deleteError } = await storageClient.remove([oldImage]);

    if (deleteError) {
      throw Error("Cabin could not be deleted!!!");
    }
  }

  const { error } = await BuildAPIClient("cabins").delete().eq("id", cabinId);

  if (error) {
    throw Error("Cabin could not be deleted!!!");
  }
}

type CreateCabinArgs = {
  newCabin: Omit<TablesInsert<"cabins">, "image"> & {
    image: File;
  };
};
export async function createCabin({ newCabin }: CreateCabinArgs) {
  const imageName = crypto.randomUUID() + newCabin.image.name;
  const storageClient = BuildStorageAPIClient().from("cabin_showcases");

  const { data: storageData, error: storageError } = await storageClient.upload(
    imageName,
    newCabin.image,
  );

  if (!storageError) {
    const { error } = await BuildAPIClient("cabins").insert({
      ...newCabin,
      image:
        import.meta.env.VITE_SUPABASE_STORAGE_URL +
        "/" +
        supabaseStorageDataSchema.parse(storageData).fullPath,
    });

    if (error) {
      throw Error("Cabin could not be created!!!");
    }
  }
}

type UpdateCabinArgs = {
  newCabin: TablesInsert<"cabins"> & {
    newImage: File | null;
  };
};
export async function updateCabin({ newCabin }: UpdateCabinArgs) {
  if (newCabin.newImage) {
    const newImageName = crypto.randomUUID() + newCabin.newImage.name;
    const storageClient = BuildStorageAPIClient().from("cabin_showcases");
    const { data: storageData, error: newStorageError } =
      await storageClient.upload(newImageName, newCabin.newImage);

    if (newStorageError) {
      throw Error("Cabin image could not be updated!!!");
    }

    const oldImage = newCabin.image.split("/").pop();

    if (oldImage) {
      const { error: deleteError } = await storageClient.remove([oldImage]);

      if (deleteError) {
        throw Error("Cabin image could not be updated!!!");
      }
    }

    const { error: updateError } = await BuildAPIClient("cabins")
      .update({
        ...newCabin,
        image:
          import.meta.env.VITE_SUPABASE_STORAGE_URL +
          "/" +
          supabaseStorageDataSchema.parse(storageData).fullPath,
        newImage: undefined,
      })
      .eq("id", newCabin.id);

    if (updateError) {
      throw Error("Cabin could not be updated!!!");
    }
  } else {
    const { error: updateError } = await BuildAPIClient("cabins")
      .update({
        ...newCabin,
        newImage: undefined,
      })
      .eq("id", newCabin.id);

    if (updateError) {
      throw Error("Cabin could not be updated!!!");
    }
  }
}
