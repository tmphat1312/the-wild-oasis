import { CabinInput, CabinSchema, CabinType } from "@/schemas/CabinSchema";
import {
  buildCabinStorageUrl,
  createCabinImage,
  duplicateCabinImage,
  removeCabinImage,
} from "@/services/APIStorage";
import { z } from "zod";
import { APIClient } from "./APIClient";

export async function getCabins() {
  try {
    const { data } = await APIClient.from("cabins").select("*").throwOnError();
    return z.array(CabinSchema).parse(data);
  } catch (error) {
    throw Error("Cabins could not be fetched!!!");
  }
}

type DeleteCabinArgs = {
  cabinId: CabinType["id"];
  cabinImage: CabinType["image"];
};
export async function deleteCabinById({
  cabinId,
  cabinImage,
}: DeleteCabinArgs) {
  try {
    await Promise.all([
      APIClient.from("cabins").delete().eq("id", cabinId).throwOnError(),
      removeCabinImage(cabinImage),
    ]);
  } catch (error) {
    throw Error("Cabin could not be deleted!!!");
  }
}

type CreateCabinArgs = {
  newCabin: Omit<CabinInput, "image"> & {
    image: File;
  };
};
export async function createCabin({ newCabin }: CreateCabinArgs) {
  let imageStorageUrl: string | null = null;

  try {
    const imageName = await createCabinImage(newCabin.image);
    imageStorageUrl = buildCabinStorageUrl(imageName);

    await APIClient.from("cabins")
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

export async function updateCabin({
  newCabin,
}: {
  newCabin: CabinInput & {
    newImage: FileList | null;
  };
}) {
  let newImageStorageUrl: string | null = null;

  try {
    if (newCabin.newImage) {
      const newImageName = await createCabinImage(newCabin.newImage[0]);
      newImageStorageUrl = buildCabinStorageUrl(newImageName);
      await APIClient.from("cabins")
        .update({
          ...newCabin,
          image: newImageStorageUrl,
          newImage: undefined,
        })
        .eq("id", newCabin.id)
        .throwOnError();
      await removeCabinImage(newCabin.image);
    } else {
      await APIClient.from("cabins")
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
  cabin: CabinType;
};

export async function duplicateCabin({ cabin }: DuplicateCabinArgs) {
  let toImageStorageUrl: string | null = null;

  try {
    const toImage = await duplicateCabinImage(cabin.image);
    toImageStorageUrl = buildCabinStorageUrl(toImage);

    await APIClient.from("cabins")
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
