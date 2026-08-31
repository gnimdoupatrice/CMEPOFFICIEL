CREATE POLICY "Admins upload article images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read article images" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update article images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete article images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));