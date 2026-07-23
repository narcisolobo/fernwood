const STUDIO_TIME_ZONE = "America/Los_Angeles";

// "Today" must mean the studio's calendar day, not the calendar day where
// the code happens to run — a server typically runs in UTC and a visitor's
// browser could be in any zone, both of which can disagree with Pacific
// time for a window around midnight.
function getStudioToday(now: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STUDIO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const lookup: Record<string, string> = {};
  for (const { type, value } of parts) lookup[type] = value;

  return new Date(
    Number(lookup.year),
    Number(lookup.month) - 1,
    Number(lookup.day),
  ); // local midnight, not UTC — same convention as fromDateParam
}

function toDateParam(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateParam(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight, not UTC
}

function isSameLocalDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export {
  toDateParam,
  fromDateParam,
  isSameLocalDate,
  getStudioToday,
  STUDIO_TIME_ZONE,
};
