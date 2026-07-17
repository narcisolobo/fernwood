import ClassScheduleTable from "@/sections/schedule/ClassScheduleTable";
import Schedule from "@/sections/schedule/Schedule";

interface SchedulePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function SchedulePage({ searchParams }: SchedulePageProps) {
  const rawDate = (await searchParams).date;
  const dateStr = typeof rawDate === "string" ? rawDate : undefined;

  return (
    <main>
      <Schedule />
      <ClassScheduleTable dateStr={dateStr} />
    </main>
  );
}

export default SchedulePage;
