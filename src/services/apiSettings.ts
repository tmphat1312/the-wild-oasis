import { settingSchema } from "@/schemas/settingSchema";
import { TablesUpdate } from "@/types/database";
import { buildAPIClient } from "./APIClient";

const THE_ONLY_SETTING_ID = 1;

export async function getSettings() {
  const { data } = await buildAPIClient("settings")
    .select()
    .single()
    .throwOnError();

  return settingSchema.parse(data);
}

type UpdateSettingArgs = {
  newSettings: TablesUpdate<"settings">;
};
export async function updateSettings({ newSettings }: UpdateSettingArgs) {
  const { data } = await buildAPIClient("settings")
    .update(newSettings)
    .eq("id", THE_ONLY_SETTING_ID)
    .select()
    .single()
    .throwOnError();

  return settingSchema.parse(data);
}
