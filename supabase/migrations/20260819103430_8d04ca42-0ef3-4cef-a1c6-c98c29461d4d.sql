CREATE POLICY "admins manage covers" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(),'admin'))
WITH CHECK (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone uploads cv" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'applications-cv');

CREATE POLICY "admins read cv" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'applications-cv' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "admins manage team photos" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'team-photos' AND public.has_role(auth.uid(),'admin'))
WITH CHECK (bucket_id = 'team-photos' AND public.has_role(auth.uid(),'admin'));

CREATE TYPE public.team_group AS ENUM ('direction','secretariat','communication','economat');

CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  role text NOT NULL DEFAULT '',
  team_group public.team_group NOT NULL DEFAULT 'direction',
  photo_url text,
  bio text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team members are public" ON public.team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins insert team members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update team members" ON public.team_members FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete team members" ON public.team_members FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE INDEX team_members_order_idx ON public.team_members (team_group, display_order);
CREATE TRIGGER team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.team_members (full_name, role, team_group, display_order) VALUES
  ('Christian AKAKPO', 'Program Manager (Coordonnateur du Programme)', 'direction', 1),
  ('ADAN Kpamou Assossimna', 'Project Manager (Responsable de projet)', 'direction', 2),
  ('MAMOUDOU Ramatha', 'Secrétaire générale', 'secretariat', 1),
  ('ESSE Eyram', 'Secrétaire Principal (Responsable équipe Secrétariat)', 'secretariat', 2),
  ('ABOUDOULAYE Faïzou', 'Community Manager (Responsable équipe Communication)', 'communication', 1),
  ('AWESSO Samie Magnimwè Rodrigue', 'Présentateur, Assistant du responsable Communication', 'communication', 2),
  ('KOLA Kodzo', 'Présentateur, Chargé à l''information', 'communication', 3),
  ('TOKPO Kodjo Roméo', 'Vidéaste, Chargé de la création de contenus', 'communication', 4),
  ('POKONA Solim Gloria', 'Comptable (Responsable équipe Économat)', 'economat', 1);