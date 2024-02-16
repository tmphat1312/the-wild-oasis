import { SettingsFormValues } from "@/schemas/UpdateSettingsForm";
import { APIClientBuilder } from "./APIClient";

const settingClient = APIClientBuilder("settings");

export async function getSettings() {
  const { data, error } = await settingClient.select().single();
  const settings: SettingsFormValues = data || {};

  if (error) {
    throw error;
  }

  return settings;
}

export async function updateSettings({
  newSettings,
}: {
  newSettings: SettingsFormValues;
}) {
  const { data, error } = await settingClient
    .update(newSettings)
    .eq("id", 1)
    .select()
    .single();
  const settings: SettingsFormValues = data || {};

  if (error) {
    throw error;
  }

  return settings;
}
