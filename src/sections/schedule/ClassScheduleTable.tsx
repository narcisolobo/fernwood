import { getWeekSchedule } from "@/lib/schedule";
import ScheduleControls from "./ScheduleControls";
import WeekTableBody from "./WeekTableBody";

export const dynamic = "force-dynamic";

interface ClassScheduleTableProps {
  dateStr?: string;
  type?: "reformer" | "mat";
}

function parseDateStr(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight, not UTC
}

async function ClassScheduleTable({ dateStr, type }: ClassScheduleTableProps) {
  const startDate = dateStr ? parseDateStr(dateStr) : new Date();
  const week = await getWeekSchedule(startDate, type);

  return (
    <section className="pb-20">
      <div className="container mx-auto px-2 md:px-0">
        <div className="border-base-300 bg-base-100 rounded-box mt-4 overflow-hidden border">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <h2 className="text-lg font-semibold">Class Schedule</h2>
            <ScheduleControls />
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>Class</th>
                  <th>Teacher</th>
                  <th>Duration</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {week.map((day) => (
                <WeekTableBody key={day.date.toISOString()} day={day} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassScheduleTable;
