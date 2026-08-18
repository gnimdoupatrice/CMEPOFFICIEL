CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
CREATE TYPE public.opportunity_category AS ENUM ('formation_certifiante','atelier_formation');
CREATE TYPE public.opportunity_badge AS ENUM ('a_la_une','inscriptions_ouvertes','cloture');
CREATE TYPE public.opportunity_status AS ENUM ('draft','published','archived');
CREATE TYPE public.application_mode AS ENUM ('whatsapp','form');
CREATE TYPE public.application_status AS ENUM ('nouvelle','en_revue','acceptee','refusee');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category public.opportunity_category NOT NULL DEFAULT 'formation_certifiante',
  badge public.opportunity_badge,
  cover_image text,
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sessions jsonb NOT NULL DEFAULT '[]'::jsonb,
  registration_deadline date,
  modules jsonb NOT NULL DEFAULT '[]'::jsonb,
  pricing jsonb NOT NULL DEFAULT '[]'::jsonb,
  application_mode public.application_mode NOT NULL DEFAULT 'whatsapp',
  whatsapp_message text,
  status public.opportunity_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.opportunities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.opportunities TO authenticated;
GRANT ALL ON public.opportunities TO service_role;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published opportunities are public" ON public.opportunities FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "admins read all opportunities" ON public.opportunities FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins insert opportunities" ON public.opportunities FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update opportunities" ON public.opportunities FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete opportunities" ON public.opportunities FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  profile text,
  motivation text,
  cv_url text,
  status public.application_status NOT NULL DEFAULT 'nouvelle',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can apply" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read applications" ON public.applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update applications" ON public.applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete applications" ON public.applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX opportunities_status_idx ON public.opportunities (status, sort_order DESC, created_at DESC);
CREATE INDEX applications_opportunity_idx ON public.applications (opportunity_id, created_at DESC);

CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'archive-expired-opportunities',
  '5 0 * * *',
  $$UPDATE public.opportunities SET status = 'archived' WHERE status = 'published' AND registration_deadline IS NOT NULL AND registration_deadline < current_date;$$
);