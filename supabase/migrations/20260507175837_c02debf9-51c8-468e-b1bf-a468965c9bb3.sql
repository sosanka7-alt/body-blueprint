
-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  age int,
  gender text,
  height_cm numeric,
  weight_kg numeric,
  activity_level text,
  goal text,
  workout_location text,
  barriers text,
  bmi numeric,
  maintenance_calories int,
  target_calories int,
  protein_g int,
  carbs_g int,
  fat_g int,
  workout_plan jsonb,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "own profile select" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- meals
create table public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text,
  name text,
  calories int,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  fiber_g numeric,
  micros jsonb,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.meals enable row level security;
create policy "own meals select" on public.meals for select using (auth.uid() = user_id);
create policy "own meals insert" on public.meals for insert with check (auth.uid() = user_id);
create policy "own meals update" on public.meals for update using (auth.uid() = user_id);
create policy "own meals delete" on public.meals for delete using (auth.uid() = user_id);

-- meal photos bucket (public for easy display)
insert into storage.buckets (id, name, public) values ('meal-photos', 'meal-photos', true);

create policy "meal photos public read" on storage.objects for select using (bucket_id = 'meal-photos');
create policy "auth upload meal photos" on storage.objects for insert with check (bucket_id = 'meal-photos' and auth.uid() is not null);
create policy "owner update meal photos" on storage.objects for update using (bucket_id = 'meal-photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "owner delete meal photos" on storage.objects for delete using (bucket_id = 'meal-photos' and auth.uid()::text = (storage.foldername(name))[1]);
