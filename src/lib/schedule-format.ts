import { STUDIO_TIME_ZONE } from "./date-params";

function formatTime(time: string): string {
  // time comes back from Postgres as "HH:MM:SS"
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr} ${period} PDT`;
}

function formatDuration(minutes: number): string {
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return `${minutes} min`;
}

function formatDayLabel(date: Date): string {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const rest = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${weekday}|${rest}`; // caller splits on "|" for the two-tone styling
}

function formatConfirmationDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// `start_time` is a naive Postgres `time` column — it's always the studio's
// Pacific wall-clock time, never the server's local time zone. Deployed
// servers typically run in UTC, so comparing it against `now` requires
// converting it to a real instant first; otherwise the comparison silently
// shifts by the UTC/Pacific offset (and flips DST twice a year).
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string,
): Date {
  const utcGuess = new Date(Date.UTC(year, month, day, hour, minute, second));

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utcGuess);

  const lookup: Record<string, string> = {};
  for (const { type, value } of parts) lookup[type] = value;

  const asIfUtc = Date.UTC(
    Number(lookup.year),
    Number(lookup.month) - 1,
    Number(lookup.day),
    lookup.hour === "24" ? 0 : Number(lookup.hour),
    Number(lookup.minute),
    Number(lookup.second),
  );

  return new Date(utcGuess.getTime() - (asIfUtc - utcGuess.getTime()));
}

function hasClassEnded(
  date: Date,
  startTime: string,
  now: Date = new Date(),
): boolean {
  const [hour, minute, second] = startTime.split(":").map(Number);
  const startsAt = zonedTimeToUtc(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
    second,
    STUDIO_TIME_ZONE,
  );
  return startsAt < now;
}

export {
  formatTime,
  formatDuration,
  formatDayLabel,
  formatConfirmationDate,
  hasClassEnded,
};
