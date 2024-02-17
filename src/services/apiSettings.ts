import { SettingsFormValues } from "@/schemas/UpdateSettingsForm";
import { BuildAPIClient } from "./APIClient";

export async function getSettings() {
  const { data } = await BuildAPIClient("settings")
    .select()
    .single()
    .throwOnError();
  const settings: SettingsFormValues = data || {};

  return settings;
}

export async function updateSettings({
  newSettings,
}: {
  newSettings: SettingsFormValues;
}) {
  const { data } = await BuildAPIClient("settings")
    .update(newSettings)
    .eq("id", 1)
    .select()
    .single()
    .throwOnError();
  const settings: SettingsFormValues = data || {};

  return settings;
}
