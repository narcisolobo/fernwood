create or replace function cancel_booking(
  p_class_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_student_id uuid;
  v_cancelled_status text;
  v_promoted_enrollment_id uuid;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be signed in to cancel a booking.';
  end if;

  select id into v_student_id
  from students
  where user_id = v_user_id;

  if v_student_id is null then
    raise exception 'No booking found.';
  end if;

  -- Lock the class row so a concurrent booking/cancellation on the
  -- same class can't interleave with the promotion logic below.
  perform 1 from classes where id = p_class_id for update;

  -- Capture the PRE-update status. RETURNING on the update below would
  -- give the NEW value ('cancelled') every time, not the original one
  -- — that was the actual bug: the promotion check below never fired
  -- because it was comparing against a value that could never be
  -- 'booked' post-update.
  select status into v_cancelled_status
  from enrollments
  where student_id = v_student_id
    and class_id = p_class_id
    and status in ('booked', 'waitlisted');

  if v_cancelled_status is null then
    raise exception 'No active booking found for this class.';
  end if;

  update enrollments
  set status = 'cancelled'
  where student_id = v_student_id
    and class_id = p_class_id
    and status in ('booked', 'waitlisted');

  -- Only a freed *booked* spot triggers promotion. Cancelling from
  -- the waitlist doesn't open anything up.
  if v_cancelled_status = 'booked' then
    select id into v_promoted_enrollment_id
    from enrollments
    where class_id = p_class_id and status = 'waitlisted'
    order by created_at asc
    limit 1
    for update;

    if v_promoted_enrollment_id is not null then
      update enrollments
      set status = 'booked'
      where id = v_promoted_enrollment_id;
    end if;
  end if;
end;
$$;

grant execute on function cancel_booking to authenticated;
revoke execute on function cancel_booking from anon;