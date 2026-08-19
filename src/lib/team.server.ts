// Helpers serveur pour l'équipe (jamais importés côté client).
export async function signTeamPhotos(paths: (string | null)[]): Promise<Record<string, string>> {
  const unique = [...new Set(paths.filter((p): p is string => Boolean(p) && !p!.startsWith("http")))];
  if (unique.length === 0) return {};
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.storage.from("team-photos").createSignedUrls(unique, 60 * 60 * 24 * 7);
    const map: Record<string, string> = {};
    for (const item of data ?? []) {
      if (item.path && item.signedUrl) map[item.path] = item.signedUrl;
    }
    return map;
  } catch {
    return {};
  }
}

export function resolvePhoto(value: string | null, signed: Record<string, string>): string | null {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  return signed[value] ?? null;
}
