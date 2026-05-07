
drop policy if exists "meal photos public read" on storage.objects;
create policy "owner read meal photos" on storage.objects for select
  using (bucket_id = 'meal-photos' and auth.uid()::text = (storage.foldername(name))[1]);
