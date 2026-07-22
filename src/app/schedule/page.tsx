import ClassScheduleTable from "@/sections/schedule/ClassScheduleTable";
import Schedule from "@/sections/schedule/Schedule";
import { type Metadata } from "next";
import { fromDateParam } from "@/lib/date-params";
import { formatDayLabel } from "@/lib/schedule-format";

interface Params {
  searchParams: Promise<{ date?: string }>;
}

async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { date } = await searchParams;
  const parsed = date ? fromDateParam(date) : new Date();
  const [weekday, dateLabel] = formatDayLabel(parsed).split("|");

  return {
    title: `Class Schedule — ${weekday}, ${dateLabel}`,
    description:
      "Browse a full week of Reformer and mat Pilates classes at Fernwood, with live availability and instant booking. Filter by class type, see what's open.",
  };
}

interface SchedulePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function SchedulePage({ searchParams }: SchedulePageProps) {
  const params = await searchParams;
  const rawDate = params.date;
  const dateStr = typeof rawDate === "string" ? rawDate : undefined;

  const rawType = params.type;
  const type =
    rawType === "reformer" || rawType === "mat" ? rawType : undefined;

  return (
    <main>
      <Schedule />
      <ClassScheduleTable dateStr={dateStr} type={type} />
    </main>
  );
}

export { generateMetadata };
export default SchedulePage;
