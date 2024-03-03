import { SettingInput, SettingSchema } from "@/schemas/SettingSchema";
import { APIClient } from "./APIClient";
import { throwDemoAppError } from "@/lib/utils";

const THE_ONLY_SETTING_ID = 1;

export async function getSettings() {
  const { data } = await APIClient.from("settings")
    .select()
    .single()
    .throwOnError();

  return SettingSchema.parse(data);
}

export async function updateSettings({
  newSettings,
}: {
  newSettings: SettingInput;
}) {
  throwDemoAppError();

  const { data } = await APIClient.from("settings")
    .update(newSettings)
    .eq("id", THE_ONLY_SETTING_ID)
    .select()
    .single()
    .throwOnError();

  return SettingSchema.parse(data);
}
