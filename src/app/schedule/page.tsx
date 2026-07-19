import ClassScheduleTable from "@/sections/schedule/ClassScheduleTable";
import Schedule from "@/sections/schedule/Schedule";

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

export default SchedulePage;
