import ScheduleControls from "./ScheduleControls";

function Skeleton() {
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
                <tr className="bg-base-200">
                  <td colSpan={6}>
                    <div className="skeleton h-4 w-24"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-22"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-18"></div>
                  </td>
                  <td>
                    <div className="skeleton h-8 w-25"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-22"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-18"></div>
                  </td>
                  <td>
                    <div className="skeleton h-8 w-25"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-22"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-18"></div>
                  </td>
                  <td>
                    <div className="skeleton h-8 w-25"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked day-grouped cards, no column headers */}
          <div className="flex flex-col px-4 pb-4 md:hidden">
            <div>
              <div className="flex flex-col gap-3">
                <div className="card border-base-300 card-sm border shadow">
                  <div className="card-body">
                    <div>
                      <div className="skeleton mb-2 h-4 w-32"></div>
                      <div className="skeleton mb-4 h-4 w-48"></div>
                      <div className="skeleton mb-4 h-4 w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skeleton;
