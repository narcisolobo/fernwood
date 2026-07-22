import JoinButton from "./JoinButton";
import { type ScheduleClass } from "./schedule-data";

interface ClassCardProps extends ScheduleClass {
  date: Date;
  defaultName: string | null;
}

function ClassCard({
  id,
  time,
  name,
  teacher,
  duration,
  status,
  spotsOpen,
  waitlistCount,
  myStatus,
  hasEnded,
  date,
  defaultName,
}: ClassCardProps) {
  return (
    <div className="card border-base-300 card-sm border shadow">
      <div className="card-body">
        <div>
          <p className="text-base-content/60 text-xs whitespace-nowrap">
            {time} · {duration}
          </p>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-base-content/60 text-base">{teacher}</p>
          <p className="mb-3 text-xs">
            {status === "open"
              ? `${spotsOpen} spots open`
              : `${waitlistCount} in waitlist`}
          </p>
          <JoinButton
            name={name}
            classId={id.toString()}
            teacher={teacher}
            status={status}
            myStatus={myStatus}
            hasEnded={hasEnded}
            date={date}
            defaultName={defaultName}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
