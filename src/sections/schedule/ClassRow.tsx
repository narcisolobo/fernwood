import JoinButton from "./JoinButton";
import { type ScheduleClass } from "./schedule-data";

function ClassRow({
  id,
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
            : `${waitlistCount} in waitlist`}
        </p>
      </td>
      <td>
        <JoinButton
          name={name}
          classId={id.toString()}
          teacher={teacher}
          status={status}
        />
      </td>
    </tr>
  );
}

export default ClassRow;
