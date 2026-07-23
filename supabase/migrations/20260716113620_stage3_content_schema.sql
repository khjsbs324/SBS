-- Stage 3: public site content schema.
-- Public clients can only read published rows. Write policies are intentionally
-- deferred until the separate admin application and its authorization model exist.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon, authenticated;

create table public.app_settings (
    key text primary key,
    value jsonb not null,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint app_settings_key_format check (key ~ '^[a-z][a-z0-9_]*$')
);

create table public.curriculum_categories (
    slug text primary key,
    parent_slug text references public.curriculum_categories(slug) on update cascade on delete restrict,
    name text not null,
    course_flow_html text not null default '',
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint curriculum_categories_slug_format check (slug ~ '^[a-z][a-z0-9_]*$'),
    constraint curriculum_categories_sort_order_check check (sort_order >= 0),
    constraint curriculum_categories_not_self_parent check (parent_slug is null or parent_slug <> slug)
);

create table public.courses (
    id bigint generated always as identity primary key,
    name text not null unique,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint courses_name_not_blank check (length(btrim(name)) > 0)
);

create table public.category_courses (
    category_slug text not null references public.curriculum_categories(slug) on update cascade on delete cascade,
    course_id bigint not null references public.courses(id) on delete cascade,
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (category_slug, course_id),
    constraint category_courses_sort_order_check check (sort_order >= 0),
    constraint category_courses_unique_order unique (category_slug, sort_order)
);

create table public.course_images (
    id bigint generated always as identity primary key,
    course_id bigint not null references public.courses(id) on delete cascade,
    image_url text not null,
    alt_text text not null default '',
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint course_images_https_url check (image_url ~ '^https://'),
    constraint course_images_sort_order_check check (sort_order >= 0),
    constraint course_images_unique_order unique (course_id, sort_order),
    constraint course_images_unique_url unique (course_id, image_url)
);

create table public.curriculum_shortcuts (
    id bigint generated always as identity primary key,
    label text not null,
    title text not null,
    description_lines text[] not null,
    target_category_slug text not null references public.curriculum_categories(slug) on update cascade on delete restrict,
    aria_label text not null,
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint curriculum_shortcuts_description_check check (cardinality(description_lines) > 0),
    constraint curriculum_shortcuts_sort_order_check check (sort_order >= 0),
    constraint curriculum_shortcuts_unique_order unique (sort_order)
);

create table public.portfolio_items (
    id bigint generated always as identity primary key,
    thumbnail_url text not null,
    detail_image_url text not null,
    alt_text text not null,
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint portfolio_items_thumbnail_https_url check (thumbnail_url ~ '^https://'),
    constraint portfolio_items_detail_https_url check (detail_image_url ~ '^https://'),
    constraint portfolio_items_sort_order_check check (sort_order >= 0),
    constraint portfolio_items_unique_order unique (sort_order)
);

create table public.review_items (
    id bigint generated always as identity primary key,
    kind text not null,
    label text not null,
    title text,
    body text not null,
    course_name text,
    author_name text not null,
    year_label text,
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint review_items_kind_check check (kind in ('hero', 'item')),
    constraint review_items_sort_order_check check (sort_order >= 0),
    constraint review_items_unique_order unique (sort_order),
    constraint review_items_hero_title_check check (kind <> 'hero' or title is not null)
);

create table public.seminars (
    id bigint generated always as identity primary key,
    branch text not null,
    title text not null,
    description text not null,
    event_date_label text not null,
    application_period_label text not null,
    image_url text not null,
    background_class text not null default '',
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint seminars_image_https_url check (image_url ~ '^https://'),
    constraint seminars_sort_order_check check (sort_order >= 0),
    constraint seminars_unique_order unique (sort_order)
);

create index curriculum_categories_parent_slug_idx
    on public.curriculum_categories (parent_slug)
    where parent_slug is not null;

create index category_courses_course_id_idx
    on public.category_courses (course_id);

create index category_courses_published_order_idx
    on public.category_courses (category_slug, sort_order)
    where is_published;

create index course_images_published_order_idx
    on public.course_images (course_id, sort_order)
    where is_published;

create index curriculum_shortcuts_published_order_idx
    on public.curriculum_shortcuts (sort_order)
    where is_published;

create index portfolio_items_published_order_idx
    on public.portfolio_items (sort_order)
    where is_published;

create index review_items_published_order_idx
    on public.review_items (kind, sort_order)
    where is_published;

create index seminars_published_order_idx
    on public.seminars (sort_order)
    where is_published;

create trigger app_settings_set_updated_at
before update on public.app_settings
for each row execute function private.set_updated_at();

create trigger curriculum_categories_set_updated_at
before update on public.curriculum_categories
for each row execute function private.set_updated_at();

create trigger courses_set_updated_at
before update on public.courses
for each row execute function private.set_updated_at();

create trigger category_courses_set_updated_at
before update on public.category_courses
for each row execute function private.set_updated_at();

create trigger course_images_set_updated_at
before update on public.course_images
for each row execute function private.set_updated_at();

create trigger curriculum_shortcuts_set_updated_at
before update on public.curriculum_shortcuts
for each row execute function private.set_updated_at();

create trigger portfolio_items_set_updated_at
before update on public.portfolio_items
for each row execute function private.set_updated_at();

create trigger review_items_set_updated_at
before update on public.review_items
for each row execute function private.set_updated_at();

create trigger seminars_set_updated_at
before update on public.seminars
for each row execute function private.set_updated_at();

alter table public.app_settings enable row level security;
alter table public.curriculum_categories enable row level security;
alter table public.courses enable row level security;
alter table public.category_courses enable row level security;
alter table public.course_images enable row level security;
alter table public.curriculum_shortcuts enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.review_items enable row level security;
alter table public.seminars enable row level security;

revoke all on table
    public.app_settings,
    public.curriculum_categories,
    public.courses,
    public.category_courses,
    public.course_images,
    public.curriculum_shortcuts,
    public.portfolio_items,
    public.review_items,
    public.seminars
from anon, authenticated;

grant select on table
    public.app_settings,
    public.curriculum_categories,
    public.courses,
    public.category_courses,
    public.course_images,
    public.curriculum_shortcuts,
    public.portfolio_items,
    public.review_items,
    public.seminars
to anon, authenticated;

create policy "published app settings are publicly readable"
on public.app_settings for select
to anon, authenticated
using (is_published);

create policy "published curriculum categories are publicly readable"
on public.curriculum_categories for select
to anon, authenticated
using (is_published);

create policy "published courses are publicly readable"
on public.courses for select
to anon, authenticated
using (is_published);

create policy "published category courses are publicly readable"
on public.category_courses for select
to anon, authenticated
using (is_published);

create policy "published course images are publicly readable"
on public.course_images for select
to anon, authenticated
using (is_published);

create policy "published curriculum shortcuts are publicly readable"
on public.curriculum_shortcuts for select
to anon, authenticated
using (is_published);

create policy "published portfolio items are publicly readable"
on public.portfolio_items for select
to anon, authenticated
using (is_published);

create policy "published review items are publicly readable"
on public.review_items for select
to anon, authenticated
using (is_published);

create policy "published seminars are publicly readable"
on public.seminars for select
to anon, authenticated
using (is_published);
