import ClassRow from "./OldClassRow";
import classes from "./old-schedule-data";

function ClassScheduleTable() {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-2 md:px-0">
        <div className="border-base-300 bg-base-100 rounded-box overflow-hidden border">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <h2 className="text-lg font-semibold">Class Schedule</h2>
            <div className="flex items-center gap-2">
              <button className="btn btn-primary btn-sm btn-soft">Today</button>
              <div className="join">
                <button className="btn btn-soft btn-sm join-item whitespace-nowrap">
                  ‹ Day
                </button>
                <button className="btn btn-soft btn-sm join-item whitespace-nowrap">
                  Week ›
                </button>
              </div>
              <input
                type="date"
                defaultValue="2026-07-13"
                className="input input-bordered input-sm"
              />
            </div>
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
                    <span className="font-display font-semibold">Mon</span>{" "}
                    <span className="text-base-content/60">July 13, 2026</span>
                  </td>
                </tr>
                {classes.map((cls) => (
                  <ClassRow
                    key={cls.id}
                    time={cls.time}
                    name={cls.name}
                    teacher={cls.teacher}
                    duration={cls.duration}
                    status={cls.status}
                    spotsOpen={cls.spotsOpen}
                    waitlistCount={cls.waitlistCount}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassScheduleTable;
