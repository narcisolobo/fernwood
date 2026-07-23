import { getWeekSchedule } from "@/lib/schedule";
import { getMyStudentName } from "@/lib/student";
import { fromDateParam, getStudioToday } from "@/lib/date-params";
import ScheduleControls from "./ScheduleControls";
import WeekTableBody from "./WeekTableBody";
import WeekCardList from "./WeekCardList";

export const dynamic = "force-dynamic";

interface ClassScheduleTableProps {
  dateStr?: string;
  type?: "reformer" | "mat";
}

async function ClassScheduleTable({ dateStr, type }: ClassScheduleTableProps) {
  const startDate = dateStr ? fromDateParam(dateStr) : getStudioToday();
  const [week, defaultName] = await Promise.all([
    getWeekSchedule(startDate, type),
    getMyStudentName(),
  ]);

  return (
    <section className="pb-20">
      <div className="container mx-auto px-2 md:px-0">
        <div className="border-base-300 bg-base-100 rounded-box mt-4 overflow-hidden border">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <h2 className="text-lg font-semibold">Class Schedule</h2>
            <ScheduleControls />
          </div>

          {/* Desktop: table, columns, shared header row */}
          <div className="hidden overflow-x-auto md:block">
            <table className="table table-fixed">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[24%]" />
                <col className="w-[16%]" />
                <col className="w-[10%]" />
                <col className="w-[18%]" />
                <col className="w-[20%]" />
              </colgroup>
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
                <WeekTableBody
                  key={day.date.toISOString()}
                  day={day}
                  defaultName={defaultName}
                />
              ))}
            </table>
          </div>

          {/* Mobile: stacked day-grouped cards, no column headers */}
          <div className="flex flex-col px-4 pb-4 md:hidden">
            {week.map((day, index) => (
              <WeekCardList
                key={day.date.toISOString()}
                day={day}
                defaultName={defaultName}
                isLast={index === week.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassScheduleTable;
