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

function hasClassEnded(
  date: Date,
  startTime: string,
  now: Date = new Date(),
): boolean {
  const [hour, minute, second] = startTime.split(":").map(Number);
  const startsAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
    second,
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
