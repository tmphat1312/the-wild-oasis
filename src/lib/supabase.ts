import { buildStorageAPIClient } from "@/services/APIClient";
import z from "zod";

const urlSchema = z.string().url();
const cabinStorageClient = buildStorageAPIClient().from("cabin_showcases");

export function buildCabinStorageUrl(imageName: string) {
  const parsedPath = urlSchema.safeParse(
    import.meta.env.VITE_SUPABASE_STORAGE_URL + "/cabin_showcases/" + imageName,
  );

  if (!parsedPath.success) {
    throw Error("Invalid image name!!!");
  }

  return parsedPath.data;
}

export async function removeCabinImage(imagePath: string) {
  const parsedPath = urlSchema.safeParse(imagePath);

  if (!parsedPath.success) {
    throw Error("Invalid image path!!!");
  }

  const path = parsedPath.data;
  const imageId = path.split("/").pop() ?? path;

  const { error } = await cabinStorageClient.remove([imageId]);

  if (error) {
    throw Error("Cabin image could not be removed!!!");
  }
}

export async function createCabinImage(image: File) {
  const imageName = crypto.randomUUID() + image.name;
  const { error } = await cabinStorageClient.upload(imageName, image);

  if (error) {
    throw Error("Cabin image could not be created!!!");
  }

  return imageName;
}

export async function duplicateCabinImage(imagePath: string) {
  const parsedPath = urlSchema.safeParse(imagePath);

  if (!parsedPath.success) {
    throw Error("Invalid image path!!!");
  }

  const path = parsedPath.data;
  const fromImage = path.split("/").pop() ?? path;
  const toImage = `${crypto.randomUUID()}.${path.split(".").pop()!}`;
  const { error } = await cabinStorageClient.copy(fromImage, toImage);

  if (error) {
    throw Error("Cabin image could not be duplicated!!!");
  }

  return toImage;
}
