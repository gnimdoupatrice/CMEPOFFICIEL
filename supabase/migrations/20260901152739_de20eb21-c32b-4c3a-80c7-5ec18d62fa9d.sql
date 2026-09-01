CREATE POLICY "Admins upload opportunity covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read opportunity covers" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update opportunity covers" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete opportunity covers" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'opportunity-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can upload a CV" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'applications-cv');
CREATE POLICY "Admins read CVs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'applications-cv' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete CVs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'applications-cv' AND public.has_role(auth.uid(), 'admin'));