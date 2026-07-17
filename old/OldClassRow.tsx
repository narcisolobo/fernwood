import { type ScheduleClass } from "./old-schedule-data";

function ClassRow({
  time,
  name,
  teacher,
  duration,
  status,
  spotsOpen,
  waitlistCount,
}: ScheduleClass) {
  return (
    <tr>
      <td>{time}</td>
      <td className="font-semibold">{name}</td>
      <td>{teacher}</td>
      <td>{duration}</td>
      <td>
        <p className="text-xs">
          {status === "open"
            ? `${spotsOpen} spots open`
            : waitlistCount > -1
              ? `${waitlistCount} in waitlist`
              : ""}
        </p>
      </td>
      <td>
        {status === "open" ? (
          <button className="btn btn-secondary btn-sm btn-soft">
            Join Class
          </button>
        ) : (
          <button className="btn btn-neutral btn-sm btn-soft">
            Join Waitlist
          </button>
        )}
      </td>
    </tr>
  );
}

export default ClassRow;
