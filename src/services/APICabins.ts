import { CabinValues, cabinsSchema } from "@/schemas/cabinSchema";
import { TablesInsert, TablesUpdate } from "@/types/database";
import { BuildAPIClient, BuildStorageAPIClient } from "./APIClient";
import { supabaseStorageDataSchema } from "@/schemas/supabaseStorageDataSchema";

export async function getCabins() {
  const { data } = await BuildAPIClient("cabins").select("*").throwOnError();

  return cabinsSchema.parse(data);
}

type DeleteCabinArgs = {
  cabinId: CabinValues["id"];
};
export async function deleteCabinById({ cabinId }: DeleteCabinArgs) {
  await BuildAPIClient("cabins").delete().eq("id", cabinId).throwOnError();
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
  newCabin: TablesUpdate<"cabins">;
};
export async function updateCabin({ newCabin }: UpdateCabinArgs) {
  await BuildAPIClient("cabins")
    .update(newCabin)
    .eq("id", newCabin.id)
    .throwOnError();
}
