import { TableRow } from "@/types/table-row";
import { BuildAPIClient } from "./APIClient";
import { CabinFormValues } from "@/schemas/CabinForm";

type Cabin = TableRow<"cabins">;

export async function getCabins() {
  const { data } = await BuildAPIClient("cabins").select("*").throwOnError();
  const cabins: Cabin[] = data || [];

  return cabins;
}

export async function deleteCabinById({ cabinId }: { cabinId: Cabin["id"] }) {
  await BuildAPIClient("cabins").delete().eq("id", cabinId).throwOnError();
}

export async function createCabin({ newCabin }: { newCabin: CabinFormValues }) {
  await BuildAPIClient("cabins")
    .insert({ ...newCabin, image: "test" })
    .throwOnError();
}
