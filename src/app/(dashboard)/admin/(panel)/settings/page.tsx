import { SettingsForm } from "@/components/admin/SettingsForm";
import { loadSettings } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await loadSettings();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Site Settings</h1>
      <SettingsForm initial={settings} />
    </div>
  );
}
