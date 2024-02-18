import { CabinValues, cabinsSchema } from "@/schemas/cabinSchema";
import { TableRow } from "@/types/table-row";
import { BuildAPIClient } from "./APIClient";

type Cabin = TableRow<"cabins">;

export async function getCabins() {
  const { data } = await BuildAPIClient("cabins").select("*").throwOnError();

  return cabinsSchema.parse(data);
}

export async function deleteCabinById({ cabinId }: { cabinId: Cabin["id"] }) {
  await BuildAPIClient("cabins").delete().eq("id", cabinId).throwOnError();
}

export async function createCabin({ newCabin }: { newCabin: CabinValues }) {
  await BuildAPIClient("cabins")
    .insert({ ...newCabin, image: "test" })
    .throwOnError();
}
