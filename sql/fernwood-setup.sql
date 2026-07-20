-- ============================================================
-- FERNWOOD — SUPABASE SETUP
-- Run this whole file in the Supabase SQL editor.
-- ============================================================

-- 1. SCHEMA -----------------------------------------------------
-- create schema if not exists fernwood;

-- 2. TABLES -------------------------------------------------------
create table instructors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text
);

create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instructor_id uuid not null references instructors(id),
  day_of_week int not null,        -- 0 = Sunday ... 6 = Saturday
  start_time time not null,
  duration_minutes int not null default 60,
  capacity int not null default 12
);

create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique
);

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  status text not null default 'booked', -- 'booked' | 'waitlisted' | 'cancelled' | 'checked_in'
  created_at timestamptz not null default now(),
  unique (student_id, class_id)
);

-- 3. ROW LEVEL SECURITY --------------------------------------------
alter table instructors enable row level security;
alter table classes enable row level security;
alter table students enable row level security;
alter table enrollments enable row level security;

-- Anyone — logged in or not — can READ instructors and classes,
-- needed for the public Schedule page. No write access granted here.
create policy "anyone can read instructors"
  on instructors for select
  to anon, authenticated
  using (true);

create policy "anyone can read classes"
  on classes for select
  to anon, authenticated
  using (true);

-- students and enrollments have NO read policies at all.
-- All access to those two tables happens either through the
-- security-definer function below, or later through an
-- authenticated admin session (policies to be added in step 3
-- of the roadmap, once Supabase Auth is wired up).

-- 4. BOOKING FUNCTION ------------------------------------------------
create or replace function book_class(
  p_class_id uuid,
  p_student_name text,
  p_student_email text
)
returns table (enrollment_id uuid, enrollment_status text)
language plpgsql
security definer
set search_path = fernwood
as $$
declare
  v_student_id uuid;
  v_capacity int;
  v_booked_count int;
  v_status text;
  v_enrollment_id uuid;
begin
  insert into students (name, email)
  values (p_student_name, p_student_email)
  on conflict (email) do update set name = excluded.name
  returning id into v_student_id;

  select capacity into v_capacity
  from classes
  where id = p_class_id
  for update;

  if v_capacity is null then
    raise exception 'Class not found';
  end if;

  select count(*) into v_booked_count
  from enrollments
  where class_id = p_class_id and status = 'booked';

  v_status := case when v_booked_count < v_capacity then 'booked' else 'waitlisted' end;

  insert into enrollments (student_id, class_id, status)
  values (v_student_id, p_class_id, v_status)
  on conflict (student_id, class_id) do update set status = excluded.status
  returning id into v_enrollment_id;

  return query select v_enrollment_id, v_status;
end;
$$;

grant execute on function book_class to anon;

-- 5. SEED DATA — INSTRUCTORS ----------------------------------------
insert into instructors (name, role) values
  ('Simone Vega', 'Power Reformer'),
  ('Devon Cruz', 'Mat Pilates & Mobility'),
  ('Mara Ellison', 'Reformer Flow & Sculpt'),
  ('Ji-woo Kim', 'Mat Pilates (Apprentice)'),
  ('Lusine Sarkisian', 'Reformer Fundamentals (Apprentice)');

-- 6. SEED DATA — WEEKLY CLASS SCHEDULE --------------------------------
-- Pattern modeled on the real Fitmix schedule you referenced:
-- morning cluster (6–9am), midday lull, evening cluster (4:30–6:30pm).
-- Repeats Mon–Fri; lighter weekend schedule.

-- Weekdays (1 = Monday ... 5 = Friday)
insert into classes (name, instructor_id, day_of_week, start_time, duration_minutes, capacity)
select 'Power Reformer', id, d, '06:00'::time, 60, 12 from instructors, generate_series(1,5) as d where name = 'Simone Vega'
union all
select 'Mat Pilates & Mobility', id, d, '07:00'::time, 60, 14 from instructors, generate_series(1,5) as d where name = 'Devon Cruz'
union all
select 'Reformer Flow & Sculpt', id, d, '08:00'::time, 60, 12 from instructors, generate_series(1,5) as d where name = 'Mara Ellison'
union all
select 'Mat Pilates (Apprentice)', id, d, '09:00'::time, 60, 14 from instructors, generate_series(1,5) as d where name = 'Ji-woo Kim'
union all
select 'Power Reformer', id, d, '16:30'::time, 60, 12 from instructors, generate_series(1,5) as d where name = 'Simone Vega'
union all
select 'Reformer Flow & Sculpt', id, d, '17:30'::time, 60, 12 from instructors, generate_series(1,5) as d where name = 'Mara Ellison'
union all
select 'Reformer Fundamentals', id, d, '18:30'::time, 60, 10 from instructors, generate_series(1,5) as d where name = 'Lusine Sarkisian';

-- Weekend (0 = Sunday, 6 = Saturday) — lighter schedule, mornings only
insert into classes (name, instructor_id, day_of_week, start_time, duration_minutes, capacity)
select 'Power Reformer', id, d, '08:00'::time, 60, 12 from instructors, generate_series(0,6,6) as d where name = 'Simone Vega'
union all
select 'Mat Pilates & Mobility', id, d, '09:00'::time, 60, 14 from instructors, generate_series(0,6,6) as d where name = 'Devon Cruz'
union all
select 'Reformer Flow & Sculpt', id, d, '10:00'::time, 60, 12 from instructors, generate_series(0,6,6) as d where name = 'Mara Ellison';

-- 7. SEED DATA — STUDENTS ---------------------------------------------
insert into students (name, email) values
  ('Elena Cho', 'elena.cho@example.com'),
  ('David Okafor', 'david.okafor@example.com'),
  ('Priya Nair', 'priya.nair@example.com'),
  ('Sam Whitfield', 'sam.whitfield@example.com'),
  ('Grace Kim', 'grace.kim@example.com'),
  ('Marcus Lee', 'marcus.lee@example.com'),
  ('Theo Brandt', 'theo.brandt@example.com'),
  ('Nina Alvarez', 'nina.alvarez@example.com'),
  ('Court Simmons', 'court.simmons@example.com'),
  ('Farah Iqbal', 'farah.iqbal@example.com'),
  ('Jordan Pierce', 'jordan.pierce@example.com'),
  ('Alexis Moreau', 'alexis.moreau@example.com'),
  ('Ben Castillo', 'ben.castillo@example.com'),
  ('Renee Ozawa', 'renee.ozawa@example.com'),
  ('Miles Anderson', 'miles.anderson@example.com');

-- 8. SEED DATA — ENROLLMENTS --------------------------------------------
-- Monday 6:00 AM Power Reformer (Simone) — deliberately overfilled
-- (capacity 12) so several students land as 'waitlisted'.
with target_class as (
  select id from classes
  where day_of_week = 1 and start_time = '06:00'::time
  limit 1
),
ordered_students as (
  select id, row_number() over (order by name) as rn
  from students
  where email in (
    'elena.cho@example.com','david.okafor@example.com','priya.nair@example.com',
    'sam.whitfield@example.com','grace.kim@example.com','marcus.lee@example.com',
    'theo.brandt@example.com','nina.alvarez@example.com','court.simmons@example.com',
    'farah.iqbal@example.com','jordan.pierce@example.com','alexis.moreau@example.com',
    'ben.castillo@example.com','renee.ozawa@example.com'
  )
)
insert into enrollments (student_id, class_id, status)
select
  os.id,
  tc.id,
  case when os.rn <= 12 then 'booked' else 'waitlisted' end
from ordered_students os, target_class tc;

-- Monday 7:00 AM Mat Pilates & Mobility (Devon) — already happened
-- this morning in the demo's "current day" framing, so most attendees
-- are checked in, one is a no-show still marked 'booked'.
with target_class as (
  select id from classes
  where day_of_week = 1 and start_time = '07:00'::time
  limit 1
),
ordered_students as (
  select id, row_number() over (order by name) as rn
  from students
  where email in (
    'miles.anderson@example.com','elena.cho@example.com','david.okafor@example.com',
    'grace.kim@example.com','theo.brandt@example.com'
  )
)
insert into enrollments (student_id, class_id, status)
select
  os.id,
  tc.id,
  case when os.rn <= 4 then 'checked_in' else 'booked' end
from ordered_students os, target_class tc;

-- Monday 4:30 PM Power Reformer (Simone) — lightly booked, still open,
-- gives the Roster screen a mostly-empty class alongside the full ones.
with target_class as (
  select id from classes
  where day_of_week = 1 and start_time = '16:30'::time
  limit 1
),
ordered_students as (
  select id from students
  where email in ('priya.nair@example.com','nina.alvarez@example.com','ben.castillo@example.com')
)
insert into enrollments (student_id, class_id, status)
select os.id, tc.id, 'booked'
from ordered_students os, target_class tc;

-- 9. SEED DATA — MON/WED/FRI MIDDAY EXTRAS -----------------------------
-- Fitmix's real schedule had extra 10am/11am classes on some days but
-- not others. Assigned to the apprentices, consistent with their bios
-- ("teaching select classes each week") rather than adding a third
-- daily slot to a lead instructor.
insert into classes (name, instructor_id, day_of_week, start_time, duration_minutes, capacity)
select 'Mat Pilates (Apprentice)', id, d, '10:00'::time, 60, 14 from instructors, generate_series(1,5,2) as d where name = 'Ji-woo Kim'
union all
select 'Reformer Fundamentals (Apprentice)', id, d, '11:00'::time, 60, 10 from instructors, generate_series(1,5,2) as d where name = 'Lusine Sarkisian';