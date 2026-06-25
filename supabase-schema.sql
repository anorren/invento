create extension if not exists "pgcrypto";

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  asset_id text not null unique,
  manufacturer text not null default '',
  model text not null default '',
  category text not null default '',
  location text not null default '',
  status text not null default 'open',
  condition text not null default '',
  serial text not null default '',
  purchase_year text not null default '',
  purchase_cost numeric(10, 2),
  accessory text not null default '',
  notes text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inventory_items_category_idx on public.inventory_items (category);
create index if not exists inventory_items_location_idx on public.inventory_items (location);
create index if not exists inventory_items_status_idx on public.inventory_items (status);
create index if not exists inventory_items_updated_at_idx on public.inventory_items (updated_at desc);

create or replace function public.set_inventory_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists inventory_items_updated_at on public.inventory_items;
create trigger inventory_items_updated_at
before update on public.inventory_items
for each row
execute function public.set_inventory_items_updated_at();

alter table public.inventory_items enable row level security;

-- Phase 1: einfache Unterrichts-/Prototyp-Variante.
-- Geeignet fuer unkritische Inventardaten. Nicht fuer personenbezogene Daten.
drop policy if exists "inventory_items_public_read" on public.inventory_items;
create policy "inventory_items_public_read"
on public.inventory_items
for select
to anon
using (true);

drop policy if exists "inventory_items_public_insert" on public.inventory_items;
create policy "inventory_items_public_insert"
on public.inventory_items
for insert
to anon
with check (true);

drop policy if exists "inventory_items_public_update" on public.inventory_items;
create policy "inventory_items_public_update"
on public.inventory_items
for update
to anon
using (true)
with check (true);

drop policy if exists "inventory_items_public_delete" on public.inventory_items;
create policy "inventory_items_public_delete"
on public.inventory_items
for delete
to anon
using (true);
