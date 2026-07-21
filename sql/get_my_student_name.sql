create or replace function get_my_student_name()
returns text
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_user_id uuid;
  v_name text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    return null;
  end if;

  select name into v_name from students where user_id = v_user_id;

  return v_name;
end;
$$;

grant execute on function get_my_student_name to authenticated;
revoke execute on function get_my_student_name from anon;
