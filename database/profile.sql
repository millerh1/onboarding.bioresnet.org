-- Create a table for Public Profiles
create table public.profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  avatar_url text,
  discord_name text,
  full_name text,

  primary key (id)
);

alter table public.profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

create table public.quests (
  id serial,
  created_at timestamp with time zone,
  parent_id uuid references profiles (id) on delete cascade,
  quest_id uuid not null,

  primary key (id),
  -- Can't have two of the same parent/quest
  unique(parent_id, quest_id)
);

alter table public.quests
  enable row level security;

-- Anyone can view quests
create policy "Quests are viewable by everyone." on public.quests
  for select using (true);

-- Allow only inserting quests for the current user.
create policy "Enable insert for the related parent_id." on public.quests
  for insert with check (auth.uid() = parent_id);
