import { supabaseServerClient } from "@/lib/supabase/server";
import { type ScheduleClass } from "@/sections/schedule/schedule-data";
import { formatTime, formatDuration, formatDayLabel } from "./schedule-format";

async function getSchedule(
  date: Date,
  type?: "reformer" | "mat",
): Promise<ScheduleClass[]> {
  const supabase = await supabaseServerClient();
  const dayOfWeek = date.getDay(); // 0 (Sun) .. 6 (Sat) — matches our schema convention

  let query = supabase
    .from("classes")
    .select(
      `
      id,
      name,
      start_time,
      duration_minutes,
      capacity,
      day_of_week,
      instructors ( name )
    `,
    )
    .eq("day_of_week", dayOfWeek);

  if (type) {
    query = query.eq("type", type);
  }

  const { data: classes, error: classesError } = await query.order(
    "start_time",
    { ascending: true },
  );

  if (classesError) {
    console.error("Failed to load classes:", classesError);
    return [];
  }

  if (!classes || classes.length === 0) return [];

  const classIds = classes.map((c) => c.id);

  const [
    { data: counts, error: countsError },
    { data: myStatuses, error: myStatusError },
  ] = await Promise.all([
    supabase.rpc("get_enrollment_counts", { p_class_ids: classIds }),
    supabase.rpc("get_my_enrollment_status", { p_class_ids: classIds }),
  ]);

  if (countsError) {
    console.error("Failed to load enrollment counts:", countsError);
  }

  if (myStatusError) {
    console.error("Failed to load enrollment status:", myStatusError);
  }

  return classes.map((cls) => {
    const classCounts = (counts ?? []).find((c) => c.class_id === cls.id);
    const bookedCount = classCounts?.booked_count ?? 0;
    const waitlistCount = classCounts?.waitlisted_count ?? 0;
    const spotsOpen = Math.max(cls.capacity - bookedCount, 0);
    const status: "open" | "full" = spotsOpen > 0 ? "open" : "full";

    const instructor = Array.isArray(cls.instructors)
      ? cls.instructors[0]
      : cls.instructors;

    const myStatus =
      (myStatuses ?? []).find((s) => s.class_id === cls.id)?.status ?? null;

    return {
      id: cls.id,
      time: formatTime(cls.start_time),
      name: cls.name,
      teacher: instructor?.name ?? "TBD",
      duration: formatDuration(cls.duration_minutes),
      status,
      spotsOpen,
      waitlistCount,
      myStatus: myStatus as "booked" | "waitlisted" | null,
    };
  });
}

interface DaySchedule {
  date: Date;
  weekday: string;
  dateLabel: string;
  classes: ScheduleClass[];
}

async function getWeekSchedule(
  startDate: Date,
  type?: "reformer" | "mat",
): Promise<DaySchedule[]> {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  // One query per day, run concurrently rather than sequentially —
  // each getSchedule call is already a complete, independent unit
  // of work (classes + enrollments for that single day_of_week).
  const results = await Promise.all(
    days.map((date) => getSchedule(date, type)),
  );

  return days.map((date, i) => {
    const [weekday, dateLabel] = formatDayLabel(date).split("|");
    return { date, weekday, dateLabel, classes: results[i] };
  });
}

export { getSchedule, getWeekSchedule, type DaySchedule };
