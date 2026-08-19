import { z } from "zod";

export const TEAM_GROUPS = [
  { value: "direction", label: "Direction" },
  { value: "secretariat", label: "Secrétariat" },
  { value: "communication", label: "Communication" },
  { value: "economat", label: "Économat" },
] as const;

export type TeamGroup = (typeof TEAM_GROUPS)[number]["value"];

export function teamGroupLabel(value: string) {
  return TEAM_GROUPS.find((g) => g.value === value)?.label ?? value;
}

export type PublicTeamMember = {
  id: string;
  full_name: string;
  role: string;
  team_group: TeamGroup;
  photo_url: string | null;
  bio: string | null;
  display_order: number;
};

export const teamMemberInputSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().trim().min(2, "Le nom complet est requis."),
  role: z.string().trim().min(2, "La fonction est requise."),
  team_group: z.enum(["direction", "secretariat", "communication", "economat"]),
  photo_url: z.string().trim().nullable().optional(),
  bio: z.string().trim().nullable().optional(),
  display_order: z.number().int().min(0).max(999),
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;

export function initials(fullName: string) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
