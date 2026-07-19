create or replace function book_class(
  p_class_id uuid,
  p_student_name text
)
returns table (enrollment_id uuid, enrollment_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_user_email text;
  v_student_id uuid;
  v_capacity int;
  v_booked_count int;
  v_status text;
  v_enrollment_id uuid;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be signed in to join a class.';
  end if;

  if p_student_name is null or trim(p_student_name) = '' then
    raise exception 'Name is required.';
  end if;

  -- pulled from the verified JWT, not client input — no way to spoof
  -- someone else's email through this function
  v_user_email := auth.jwt() ->> 'email';

  -- find or create the student row tied to this authenticated user.
  -- Relies on the partial unique index on students(user_id).
  insert into students (name, email, user_id)
  values (p_student_name, v_user_email, v_user_id)
  on conflict (user_id) do update set name = excluded.name
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

grant execute on function book_class to authenticated;
revoke execute on function book_class from anon;