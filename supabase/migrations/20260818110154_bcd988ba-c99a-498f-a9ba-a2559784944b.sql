CREATE POLICY "admins manage covers" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(),'admin'))
WITH CHECK (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone uploads cv" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'applications-cv');

CREATE POLICY "admins read cv" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'applications-cv' AND public.has_role(auth.uid(),'admin'));