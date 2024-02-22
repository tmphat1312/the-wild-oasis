import { CabinValues, cabinsSchema } from "@/schemas/cabinSchema";
import { TablesInsert, TablesUpdate } from "@/types/database";
import { BuildAPIClient } from "./APIClient";

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
  await BuildAPIClient("cabins")
    .insert({ ...newCabin, image: "test" })
    .throwOnError();
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
