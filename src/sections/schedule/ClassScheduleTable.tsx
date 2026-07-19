import ClassRow from "./ClassRow";
import ScheduleControls from "./ScheduleControls";
import { getSchedule, formatDayLabel } from "@/lib/schedule";

export const dynamic = "force-dynamic";

interface ClassScheduleTableProps {
  dateStr?: string;
  type?: "reformer" | "mat";
}

async function ClassScheduleTable({ dateStr, type }: ClassScheduleTableProps) {
  const date = dateStr ? new Date(dateStr) : new Date();
  const classes = await getSchedule(date, type);
  const [weekday, rest] = formatDayLabel(date).split("|");

  return (
    <section className="pb-20">
      <div className="container mx-auto px-2 md:px-0">
        <div className="border-base-300 bg-base-100 rounded-box overflow-hidden border">
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
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <span className="font-display font-semibold">
                      {weekday}
                    </span>{" "}
                    <span className="text-base-content/60">{rest}</span>
                  </td>
                </tr>
                {classes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-base-content/60 py-6 text-center"
                    >
                      No classes scheduled this day.
                    </td>
                  </tr>
                ) : (
                  classes.map((cls) => <ClassRow key={cls.id} {...cls} />)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassScheduleTable;
