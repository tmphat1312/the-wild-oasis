import {
  buildCabinStorageUrl,
  createCabinImage,
  duplicateCabinImage,
  removeCabinImage,
} from "@/lib/supabase";
import { CabinValues, cabinsSchema } from "@/schemas/cabinSchema";
import { TablesInsert } from "@/types/database";
import { buildAPIClient } from "./APIClient";

export async function getCabins() {
  try {
    const { data } = await buildAPIClient("cabins").select("*").throwOnError();
    return cabinsSchema.parse(data);
  } catch (error) {
    throw Error("Cabins could not be fetched!!!");
  }
}

type DeleteCabinArgs = {
  cabinId: CabinValues["id"];
  cabinImage: CabinValues["image"];
};
export async function deleteCabinById({
  cabinId,
  cabinImage,
}: DeleteCabinArgs) {
  try {
    await Promise.all([
      buildAPIClient("cabins").delete().eq("id", cabinId).throwOnError(),
      removeCabinImage(cabinImage),
    ]);
  } catch (error) {
    throw Error("Cabin could not be deleted!!!");
  }
}

type CreateCabinArgs = {
  newCabin: Omit<TablesInsert<"cabins">, "image"> & {
    image: File;
  };
};
export async function createCabin({ newCabin }: CreateCabinArgs) {
  let imageStorageUrl: string | null = null;

  try {
    const imageName = await createCabinImage(newCabin.image);
    imageStorageUrl = buildCabinStorageUrl(imageName);

    await buildAPIClient("cabins")
      .insert({
        ...newCabin,
        image: imageStorageUrl,
      })
      .throwOnError();
  } catch (error) {
    if (imageStorageUrl) {
      await removeCabinImage(imageStorageUrl);
    }

    throw Error("Cabin could not be created!!!");
  }
}

type UpdateCabinArgs = {
  newCabin: TablesInsert<"cabins"> & {
    newImage: File | null;
  };
};
export async function updateCabin({ newCabin }: UpdateCabinArgs) {
  let newImageStorageUrl: string | null = null;

  try {
    if (newCabin.newImage) {
      const newImageName = await createCabinImage(newCabin.newImage);
      newImageStorageUrl = buildCabinStorageUrl(newImageName);

      await buildAPIClient("cabins")
        .update({
          ...newCabin,
          image: newImageStorageUrl,
          newImage: undefined,
        })
        .eq("id", newCabin.id)
        .throwOnError();
      await removeCabinImage(newCabin.image);
    } else {
      await buildAPIClient("cabins")
        .update({
          ...newCabin,
          newImage: undefined,
        })
        .eq("id", newCabin.id)
        .throwOnError();
    }
  } catch (error) {
    if (newImageStorageUrl) {
      await removeCabinImage(newImageStorageUrl);
    }

    throw Error("Cabin could not be updated!!!");
  }
}

type DuplicateCabinArgs = {
  cabin: CabinValues;
};

export async function duplicateCabin({ cabin }: DuplicateCabinArgs) {
  let toImageStorageUrl: string | null = null;

  try {
    const toImage = await duplicateCabinImage(cabin.image);
    toImageStorageUrl = buildCabinStorageUrl(toImage);

    await buildAPIClient("cabins")
      .insert({
        ...cabin,
        name: `${cabin.name} (copy)`,
        image: toImageStorageUrl,
        id: undefined,
      })
      .throwOnError();
  } catch (error) {
    if (toImageStorageUrl) {
      await removeCabinImage(toImageStorageUrl);
    }

    throw Error("Cabin could not be duplicated!!!");
  }
}
