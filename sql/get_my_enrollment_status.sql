create or replace function get_my_enrollment_status(p_class_ids uuid[])
returns table (class_id uuid, status text)
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_user_id uuid;
  v_student_id uuid;
begin
  v_user_id := auth.uid();

  -- Signed-out callers simply get no rows back — matches JoinButton's
  -- existing behavior of disabling the button entirely when signed out.
  if v_user_id is null then
    return;
  end if;

  select id into v_student_id from students where user_id = v_user_id;

  if v_student_id is null then
    return;
  end if;

  return query
    select e.class_id, e.status
    from enrollments e
    where e.student_id = v_student_id
      and e.class_id = any(p_class_ids)
      and e.status in ('booked', 'waitlisted');
end;
$$;

grant execute on function get_my_enrollment_status to authenticated;
revoke execute on function get_my_enrollment_status from anon;