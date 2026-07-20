select
  c.name as class_name,
  c.day_of_week,
  c.start_time,
  s.name as student_name,
  s.email as student_email,
  s.user_id is not null as has_real_account,
  e.status,
  e.created_at
from enrollments e
join students s on s.id = e.student_id
join classes c on c.id = e.class_id
order by c.day_of_week, c.start_time, e.created_at;