-- WeMarket leads table — run in Supabase SQL Editor or via Supabase CLI.
-- Public form submissions are inserted server-side using the service role key.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enum types
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.lead_status as enum (
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'PROPOSAL',
    'WON',
    'LOST'
  );
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  company text,
  email text not null,
  phone text,

  industry text not null,
  service text not null,

  goal text not null,
  preferred_contact text not null default 'Email',

  status public.lead_status not null default 'NEW',
  source text not null default 'website_contact',

  user_agent text,
  ip_hash text
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_created_at_idx on public.leads (lower(email), created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_leads_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — no public read/update/delete
-- Inserts happen via service role (bypasses RLS) from the Next.js API route.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;

-- Revoke direct table access from anon/authenticated roles (defence in depth).
revoke all on table public.leads from anon, authenticated;

-- Optional: allow service role explicit access (service role bypasses RLS by default).
grant all on table public.leads to service_role;
