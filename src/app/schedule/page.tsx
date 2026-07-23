import { fromDateParam } from "@/lib/date-params";
import { formatDayLabel } from "@/lib/schedule-format";
import ClassScheduleTable from "@/sections/schedule/ClassScheduleTable";
import Schedule from "@/sections/schedule/Schedule";
import Skeleton from "@/sections/schedule/Skeleton";
import { type Metadata } from "next";
import { Suspense } from "react";

const meta = {
  description:
    "Browse a full week of Reformer and mat Pilates classes at Fernwood, with live availability and instant booking. Filter by class type, see what's open.",
};

interface Params {
  searchParams: Promise<{ date?: string }>;
}

async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { date } = await searchParams;
  const parsed = date ? fromDateParam(date) : new Date();
  const [weekday, dateLabel] = formatDayLabel(parsed).split("|");

  return {
    title: `Class Schedule — ${weekday}, ${dateLabel}`,
    description: meta.description,
    openGraph: {
      title: `Class Schedule — ${weekday}, ${dateLabel}`,
      description: meta.description,
      url: "https://fernwood.narcisolobo.com/schedule",
      type: "website",
    },
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
    <main className="flex-1">
      <Schedule />
      <Suspense key={`${dateStr}-${type}`} fallback={<Skeleton />}>
        <ClassScheduleTable dateStr={dateStr} type={type} />
      </Suspense>
    </main>
  );
}

export { generateMetadata };
export default SchedulePage;
